# Code Explanations
This file provides beginner-friendly explanations of code changes in the YouTube Focus Saver project.

### [2024-03-19 16:30]
- **What was added/changed**: Project structure and basic UI
- **Where**: Various files in src/ directory
- **Explanation**:  
  We set up the basic structure for our browser extension. Think of this like building the frame of a house before we add rooms and furniture. We created folders to organize our code, like having separate drawers for different types of clothes. We added React (a tool that helps us build user interfaces) and Tailwind CSS (a tool that makes styling easier) to make our extension look good. We also created special scripts that will run when you visit YouTube to track video information and focus metrics.

### [2024-03-19 17:15]
- **What was added/changed**: User accounts and dashboard
- **Where**: src/popup/components/Auth.tsx, src/popup/components/Dashboard.tsx, src/popup/index.tsx
- **Explanation**:  
  We added the ability for users to create accounts and see their stats. The Auth.tsx file creates login and signup forms that collect email and password, then send that information to a service called Supabase (like a storage place on the internet). When a user logs in successfully, they can see their Dashboard, which shows them how well they've been focusing on videos. The Dashboard has different sections to show focus scores, how much time they've spent watching videos, and other stats about their viewing habits.

### [2024-03-19 17:15]
- **What was added/changed**: Database and authentication services
- **Where**: src/services/auth.ts, src/services/database.ts, src/services/supabase.ts
- **Explanation**:  
  We created "services" which are pieces of code that handle specific jobs. The auth.ts file handles signing users in and out - it's like a security guard checking IDs at the entrance. The database.ts file manages saving and retrieving information like videos and watch history - it's like a librarian who keeps track of books. The supabase.ts file connects to our online database (Supabase) - think of it as setting up a phone line to call a friend. These services work together to make sure user data is stored safely and can be accessed when needed.

### [2024-03-19 17:45]
- **What was added/changed**: TypeScript type improvements
- **Where**: src/services/database.ts, src/services/supabase.ts
- **Explanation**:  
  We added special labels (called "types") to our code that help prevent mistakes. It's like labeling different containers in your kitchen - if a container is labeled "flour" you won't accidentally put sugar in it. In our code, we created labels for things like "Video" and "WatchSession" so that when we work with these objects, our code editor can warn us if we try to use them incorrectly. We also installed a tool called "uuid" that creates unique IDs for each item we save - like giving each book in a library a unique call number.

### [2024-03-19 18:15]
- **What was added/changed**: Supabase database schema
- **Where**: supabase/schema.sql, supabase/README.md
- **Explanation**:  
  We created the blueprints for our online storage system. Think of this like designing a set of filing cabinets for an office. We specified four main "cabinets" (tables): one for storing videos, one for tracking when and how you watch videos, one for storing your overall statistics, and one for your personal preferences. We also added security rules so that only you can see your own information - like having a lock on your filing cabinet that only responds to your key. We set up automatic calculations too, so your statistics update whenever you watch a new video - similar to how a smart calculator might automatically update totals when you add new numbers.

### [2024-03-19 18:45]
- **What was added/changed**: Database migrations system
- **Where**: supabase/migrations folder, supabase/apply-migrations.js
- **Explanation**:  
  We created a system that helps us make changes to our database over time. Think about how you might renovate a house - you wouldn't tear down the whole house and rebuild it every time you want to add a new room. Instead, you'd carefully add the new room without disturbing the rest of the house. Our migration system works the same way. Each migration file contains instructions for adding or changing parts of our database without losing data. We also created a special tool (apply-migrations.js) that applies these changes safely. It's like having an instruction manual for the renovation that makes sure everything is done in the right order. 