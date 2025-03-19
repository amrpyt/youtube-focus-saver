#!/usr/bin/env node

/**
 * This script applies migrations to a Supabase instance
 * Usage: node apply-migrations.js [migration-number]
 * If migration-number is specified, it will only apply that migration
 * Otherwise, it will apply all migrations in order
 */

const fs = require('fs');
const path = require('path');
const { createClient } = require('@supabase/supabase-js');
const readline = require('readline');

// Load environment variables
require('dotenv').config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  console.error('Error: SUPABASE_URL and SUPABASE_SERVICE_KEY must be set in environment variables or .env file');
  process.exit(1);
}

// Create Supabase client with service role key (this has admin privileges!)
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

const migrationsDir = path.join(__dirname, 'migrations');

// Create a readline interface for user input
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

/**
 * Apply a single migration
 */
async function applyMigration(migrationFile) {
  console.log(`\nApplying migration: ${migrationFile}`);
  const filePath = path.join(migrationsDir, migrationFile);
  const sql = fs.readFileSync(filePath, 'utf8');
  
  try {
    // Split into separate SQL statements and execute them one by one
    const statements = sql
      .split(';')
      .map(stmt => stmt.trim())
      .filter(stmt => stmt.length > 0);
    
    for (const statement of statements) {
      const { error } = await supabase.rpc('exec_sql', { query: statement });
      
      if (error) {
        console.error(`Error executing SQL statement: ${error.message}`);
        console.error('Statement:', statement);
        return false;
      }
    }
    
    console.log(`✅ Migration ${migrationFile} applied successfully`);
    return true;
  } catch (error) {
    console.error(`❌ Error applying migration ${migrationFile}:`, error.message);
    return false;
  }
}

/**
 * Apply all migrations in order
 */
async function applyAllMigrations() {
  // Get all migration files
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.endsWith('.sql'))
    .sort(); // Sort alphabetically to ensure correct order
  
  console.log(`Found ${migrationFiles.length} migrations`);
  
  for (const migrationFile of migrationFiles) {
    const success = await applyMigration(migrationFile);
    if (!success) {
      console.error(`\n❌ Migration failed: ${migrationFile}`);
      console.error('Stopping migration process.');
      return false;
    }
  }
  
  console.log('\n✅ All migrations applied successfully');
  return true;
}

/**
 * Apply a specific migration by number
 */
async function applySpecificMigration(migrationNumber) {
  const paddedNumber = String(migrationNumber).padStart(5, '0');
  const migrationFiles = fs.readdirSync(migrationsDir)
    .filter(file => file.startsWith(paddedNumber) && file.endsWith('.sql'));
  
  if (migrationFiles.length === 0) {
    console.error(`\n❌ No migration found with number ${migrationNumber}`);
    return false;
  }
  
  if (migrationFiles.length > 1) {
    console.error(`\n❌ Multiple migrations found with number ${migrationNumber}. Please be more specific.`);
    return false;
  }
  
  return await applyMigration(migrationFiles[0]);
}

/**
 * Main function
 */
async function main() {
  console.log('YouTube Focus Saver - Database Migration Tool');
  console.log('===========================================');
  console.log(`Supabase URL: ${SUPABASE_URL}`);
  
  // Check if migrations directory exists
  if (!fs.existsSync(migrationsDir)) {
    console.error(`\n❌ Migrations directory not found: ${migrationsDir}`);
    process.exit(1);
  }
  
  rl.question('\nAre you sure you want to apply migrations to your Supabase database? (yes/no): ', async answer => {
    if (answer.toLowerCase() !== 'yes') {
      console.log('Migration cancelled');
      rl.close();
      return;
    }
    
    let success;
    const specificMigration = process.argv[2];
    
    if (specificMigration) {
      success = await applySpecificMigration(specificMigration);
    } else {
      success = await applyAllMigrations();
    }
    
    rl.close();
    process.exit(success ? 0 : 1);
  });
}

main(); 