// Direct test of Supabase connection
const { createClient } = require('@supabase/supabase-js');

// Supabase connection details
const supabaseUrl = 'https://vumeycwzwxwwefrpksql.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ1bWV5Y3d6d3h3d2VmcnBrc3FsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDE0ODIzNDIsImV4cCI6MjA1NzA1ODM0Mn0.b89cJQY8lGLXhAx_2gFc-8xdFNTa8SMflAFwJS_gFyU';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Schema name
const SCHEMA = 'youtube_focus';

// Test user ID
const TEST_USER_ID = 'd0e8c347-c5a7-4a18-90e4-e2d23b646a9d';

async function runTests() {
    console.log('🧪 Running database tests with direct SQL...');
    
    try {
        // Test getting saved videos with SQL
        console.log('\n📺 Testing saved_videos from youtube_focus schema...');
        const { data: savedVideos, error: videosError } = await supabase
            .rpc('test_get_saved_videos', { user_id_param: TEST_USER_ID });
            
        if (videosError) {
            console.error('Error:', videosError);
            // Create the function if it doesn't exist
            console.log('Creating stored function for saved_videos...');
            const { error: createFnError } = await supabase
                .rpc('exec_sql', {
                    query: `
                    CREATE OR REPLACE FUNCTION test_get_saved_videos(user_id_param UUID)
                    RETURNS SETOF youtube_focus.saved_videos AS $$
                        SELECT * FROM youtube_focus.saved_videos 
                        WHERE user_id = user_id_param
                        ORDER BY created_at DESC;
                    $$ LANGUAGE SQL;
                    `
                });
                
            if (createFnError) {
                console.error('Error creating function:', createFnError);
                
                // Try with direct SQL query
                console.log('Trying direct SQL query...');
                const { data: sqlResult, error: sqlError } = await supabase
                    .from('youtube_focus.saved_videos')
                    .select('*')
                    .eq('user_id', TEST_USER_ID);
                    
                if (sqlError) {
                    throw sqlError;
                }
                
                console.log(`Found ${sqlResult.length} saved videos via direct SQL`);
                sqlResult.forEach(video => {
                    console.log(`- ${video.title} (${video.video_id})`);
                });
            } else {
                // Try again with the function we just created
                const { data: retryVideos, error: retryError } = await supabase
                    .rpc('test_get_saved_videos', { user_id_param: TEST_USER_ID });
                    
                if (retryError) {
                    throw retryError;
                }
                
                console.log(`Found ${retryVideos.length} saved videos`);
                retryVideos.forEach(video => {
                    console.log(`- ${video.title} (${video.video_id})`);
                });
            }
        } else {
            console.log(`Found ${savedVideos.length} saved videos`);
            savedVideos.forEach(video => {
                console.log(`- ${video.title} (${video.video_id})`);
            });
        }
        
        // Try direct SQL for getting test data
        console.log('\n🔍 Trying direct SQL to count rows in each table...');
        const { data: counts, error: countsError } = await supabase
            .rpc('exec_sql', {
                query: `
                SELECT 
                    (SELECT COUNT(*) FROM youtube_focus.saved_videos) AS saved_videos_count,
                    (SELECT COUNT(*) FROM youtube_focus.watch_history) AS watch_history_count,
                    (SELECT COUNT(*) FROM youtube_focus.focus_metrics) AS focus_metrics_count,
                    (SELECT COUNT(*) FROM youtube_focus.user_preferences) AS user_preferences_count;
                `
            });
            
        if (countsError) {
            console.error('Error getting counts:', countsError);
        } else {
            console.log('Table counts:', counts);
        }
        
        console.log('\n✅ Tests completed with available methods!');
    } catch (error) {
        console.error('❌ Test failed with error:', error);
    }
}

// Run the tests
runTests().catch(console.error); 