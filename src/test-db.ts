// Add an export statement to make this a module
export {};

const { DatabaseService } = require('./services/database');

// Test user ID (matches the one we created in SQL)
const TEST_USER_ID = 'd0e8c347-c5a7-4a18-90e4-e2d23b646a9d';

// Initialize database service
const dbService = new DatabaseService();

async function runTests() {
    console.log('🧪 Running database tests...');
    
    try {
        // Test getting saved videos
        console.log('\n📺 Testing getSavedVideos...');
        const savedVideos = await dbService.getSavedVideos(TEST_USER_ID);
        console.log(`Found ${savedVideos.length} saved videos`);
        savedVideos.forEach(video => {
            console.log(`- ${video.title} (${video.video_id})`);
        });
        
        // Test getting user preferences
        console.log('\n⚙️ Testing getUserPreferences...');
        const preferences = await dbService.getUserPreferences(TEST_USER_ID);
        console.log('User preferences:', preferences);
        
        // Test getting focus metrics
        console.log('\n📊 Testing getFocusMetrics...');
        const metrics = await dbService.getFocusMetrics(TEST_USER_ID);
        console.log(`Found ${metrics.length} focus metrics records`);
        metrics.forEach(metric => {
            console.log(`- Video ${metric.video_id}: Focus score ${metric.focus_score}, ${metric.tab_switches} tab switches`);
        });
        
        // Test updating preferences
        console.log('\n✏️ Testing updateUserPreferences...');
        const newTheme = preferences?.theme === 'light' ? 'dark' : 'light';
        console.log(`Changing theme from ${preferences?.theme} to ${newTheme}`);
        const updateSuccess = await dbService.updateUserPreferences({
            user_id: TEST_USER_ID,
            theme: newTheme
        });
        console.log(`Update ${updateSuccess ? 'successful' : 'failed'}`);
        
        // Verify the update
        const updatedPreferences = await dbService.getUserPreferences(TEST_USER_ID);
        console.log('Updated preferences:', updatedPreferences);
        
        console.log('\n✅ All tests completed!');
    } catch (error) {
        console.error('❌ Test failed with error:', error);
    }
}

// Run the tests
runTests().catch(console.error); 