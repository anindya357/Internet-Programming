// Equipment data with detailed information
const equipmentData = [
    {
        id: 1,
        name: "Treadmill",
        category: "cardio",
        icon: "fa-person-running",
        status: "available",
        description: "A motorized cardio machine perfect for walking, jogging, or running indoors. Features adjustable speed, incline, and pre-programmed workouts for all fitness levels.",
        muscles: "Legs, Glutes, Core, Cardiovascular System",
        difficulty: "Beginner to Advanced",
        capacity: "1 person",
        sessionTime: "20-45 minutes",
        guidelines: [
            "Start with a 5-minute warm-up at a slow walking pace (2-3 mph)",
            "Step onto the treadmill while holding the handrails",
            "Gradually increase speed using the control panel buttons",
            "Adjust incline to simulate hill climbing (0-15% grade)",
            "Maintain proper posture: chest up, shoulders back, core engaged",
            "Keep your eyes forward, not down at your feet",
            "Cool down for 5 minutes by gradually decreasing speed",
            "Press the emergency stop button if needed"
        ],
        proTips: [
            "Land mid-foot rather than on your toes or heels",
            "Don't hold the handrails during your workout - it reduces calorie burn",
            "Use the incline feature to increase intensity without speed",
            "Stay hydrated - keep a water bottle in the holder",
            "Mix up your routine with interval training"
        ],
        benefits: [
            { icon: "fa-heart-pulse", text: "Improves cardiovascular health and endurance" },
            { icon: "fa-fire", text: "Burns 300-600 calories per 30-minute session" },
            { icon: "fa-bone", text: "Strengthens bones and reduces osteoporosis risk" },
            { icon: "fa-brain", text: "Reduces stress and improves mental health" },
            { icon: "fa-weight-scale", text: "Effective for weight loss and management" },
            { icon: "fa-lungs", text: "Increases lung capacity and oxygen intake" }
        ],
        safety: [
            "Always use the safety clip attached to your clothing",
            "Start slowly and increase intensity gradually",
            "Never jump off a moving treadmill",
            "Ensure the treadmill is completely stopped before getting off",
            "Keep the area around the treadmill clear",
            "Report any unusual noises or mechanical issues immediately"
        ],
        dos: [
            "Wear proper running shoes with good cushioning",
            "Keep your stride natural and relaxed",
            "Use interval training for better results",
            "Stay centered on the belt",
            "Warm up and cool down properly"
        ],
        donts: [
            "Don't look down at your feet while running",
            "Don't increase speed too quickly",
            "Don't run barefoot or in sandals",
            "Don't step on/off while belt is moving",
            "Don't use your phone while running at high speed"
        ]
    },
    {
        id: 2,
        name: "Stationary Bike",
        category: "cardio",
        icon: "fa-bicycle",
        status: "available",
        description: "Indoor cycling bike with adjustable resistance levels. Perfect for low-impact cardio workouts that are easy on joints while providing excellent cardiovascular benefits.",
        muscles: "Quadriceps, Hamstrings, Glutes, Calves, Core",
        difficulty: "Beginner to Intermediate",
        capacity: "1 person",
        sessionTime: "20-45 minutes",
        guidelines: [
            "Adjust seat height so your leg has a slight bend at the bottom of pedal stroke",
            "Position seat forward/backward so knee is above pedal axle",
            "Adjust handlebar height for comfortable arm position",
            "Clip in or place feet securely on pedals",
            "Start with low resistance for warm-up (5 minutes)",
            "Gradually increase resistance to desired workout intensity",
            "Maintain cadence between 80-100 RPM for moderate workout",
            "Cool down with 5 minutes of easy pedaling"
        ],
        proTips: [
            "Keep shoulders relaxed and core engaged",
            "Push down AND pull up on pedals for efficiency",
            "Try interval training: alternate high and low intensity",
            "Don't grip handlebars too tightly",
            "Adjust resistance smoothly, not abruptly"
        ],
        benefits: [
            { icon: "fa-heart", text: "Excellent cardiovascular workout" },
            { icon: "fa-joint", text: "Low-impact, easy on joints and knees" },
            { icon: "fa-fire-flame-curved", text: "Burns 400-600 calories per hour" },
            { icon: "fa-person-running", text: "Builds leg strength and endurance" },
            { icon: "fa-lungs", text: "Improves respiratory function" },
            { icon: "fa-bed", text: "Reduces stress, improves sleep quality" }
        ],
        safety: [
            "Ensure bike is stable before mounting",
            "Don't pedal backwards on bikes not designed for it",
            "Keep water nearby to stay hydrated",
            "Stop if you experience dizziness or pain",
            "Wipe down bike after use",
            "Report any loose parts or unusual sounds"
        ],
        dos: [
            "Wear padded cycling shorts for comfort",
            "Keep your back straight, don't hunch",
            "Breathe steadily and deeply",
            "Track your progress (time, distance, calories)",
            "Vary resistance to simulate terrain"
        ],
        donts: [
            "Don't lock your knees at the bottom of pedal stroke",
            "Don't lean too heavily on handlebars",
            "Don't start at high resistance without warm-up",
            "Don't pedal too fast with no resistance",
            "Don't ignore discomfort in knees or back"
        ]
    },
    {
        id: 3,
        name: "Pull-Up Machine",
        category: "cardio",
        icon: "fa-water",
        status: "available",
        description: "Full-body cardio machine that simulates rowing motion. Engages 86% of your muscles while providing low-impact cardiovascular exercise.",
        muscles: "Back, Shoulders, Arms, Core, Legs, Glutes",
        difficulty: "Beginner to Advanced",
        capacity: "1 person",
        sessionTime: "15-30 minutes",
        guidelines: [
            "Secure feet in footplates with straps over widest part of foot",
            "Start position: knees bent, shins vertical, arms extended",
            "LEGS: Push with legs first, keeping arms straight",
            "BODY: Lean back slightly (11 o'clock position) as legs extend",
            "ARMS: Pull handle to lower chest once legs are extended",
            "RECOVERY: Extend arms, lean forward, then bend knees",
            "Maintain smooth, fluid motion throughout",
            "Aim for stroke rate of 20-30 strokes per minute"
        ],
        proTips: [
            "Think 'legs, body, arms' on drive; 'arms, body, legs' on recovery",
            "Power comes from legs (60%), not arms (20%) or back (20%)",
            "Keep your core engaged throughout entire stroke",
            "Don't rush the recovery - it should take twice as long as the drive",
            "Monitor the damper setting (1-10); start at 3-5 for beginners"
        ],
        benefits: [
            { icon: "fa-dumbbell", text: "Full-body workout engaging 86% of muscles" },
            { icon: "fa-fire", text: "Burns 600-800 calories per hour" },
            { icon: "fa-heart-pulse", text: "Builds cardiovascular endurance" },
            { icon: "fa-arrows-up-down", text: "Low-impact exercise safe for joints" },
            { icon: "fa-person-running", text: "Improves posture and core strength" },
            { icon: "fa-trophy", text: "Increases overall athletic performance" }
        ],
        safety: [
            "Always secure feet properly in straps",
            "Start with lower resistance until form is mastered",
            "Keep back straight - avoid hunching or overextending",
            "Don't pull handle to neck or face",
            "Stop if you feel sharp pain in back or shoulders",
            "Ensure rowing machine is on stable surface"
        ],
        dos: [
            "Focus on technique over speed initially",
            "Breathe rhythmically with your strokes",
            "Keep wrists flat, not bent",
            "Drive explosively, recover slowly",
            "Track your split time (time per 500m)"
        ],
        donts: [
            "Don't bend your arms early in the drive",
            "Don't shoot your butt before your arms extend",
            "Don't grip the handle too tightly",
            "Don't hold your breath during rowing",
            "Don't slam the seat into the front position"
        ]
    },
    {
        id: 4,
        name: "Bench Press Station",
        category: "strength",
        icon: "fa-bed",
        status: "available",
        description: "Olympic flat bench with adjustable safety bars for barbell bench press. The king of upper body exercises for building chest, shoulder, and tricep strength.",
        muscles: "Chest (Pectorals), Shoulders (Deltoids), Triceps",
        difficulty: "Intermediate to Advanced",
        capacity: "1 person (spotter recommended)",
        sessionTime: "15-25 minutes",
        guidelines: [
            "Lie flat on bench with eyes under the barbell",
            "Plant feet firmly on floor, slightly wider than hip-width",
            "Grip bar slightly wider than shoulder-width (even on both sides)",
            "Unrack bar with arms extended, position over chest",
            "Lower bar to mid-chest in controlled motion (2-3 seconds)",
            "Touch chest lightly, don't bounce the bar",
            "Press bar up explosively until arms are extended",
            "Keep elbows at 45-degree angle, not flared out",
            "Complete desired reps, re-rack safely",
            "Always use a spotter for heavy weights"
        ],
        proTips: [
            "Retract shoulder blades (squeeze them together) before lifting",
            "Maintain slight arch in lower back throughout movement",
            "Drive through your feet for more power",
            "Breathe in on the way down, exhale on the way up",
            "Start with just the bar (45 lbs) to perfect form"
        ],
        benefits: [
            { icon: "fa-hand-fist", text: "Builds chest, shoulder, and arm strength" },
            { icon: "fa-up-right-and-down-left-from-center", text: "Increases upper body muscle mass" },
            { icon: "fa-bone", text: "Improves bone density in upper body" },
            { icon: "fa-person-running", text: "Enhances pushing strength for daily activities" },
            { icon: "fa-weight-hanging", text: "Boosts metabolism and calorie burn" },
            { icon: "fa-trophy", text: "Builds functional strength for sports" }
        ],
        safety: [
            "ALWAYS use a spotter when lifting heavy weights",
            "Set safety bars at appropriate height",
            "Start with lighter weights to learn proper form",
            "Never bounce bar off chest",
            "Don't lift more than you can safely control",
            "Use collars to secure weight plates",
            "Clear the area around the bench"
        ],
        dos: [
            "Warm up with lighter sets before heavy lifting",
            "Keep wrists straight, not bent backwards",
            "Maintain controlled tempo throughout",
            "Use full range of motion",
            "Re-rack bar only when arms are fully extended"
        ],
        donts: [
            "Don't lift feet off the ground",
            "Don't arch your back excessively",
            "Don't flare elbows straight out to sides",
            "Don't lock elbows at top with a jerk",
            "Don't attempt one-rep max without spotter"
        ]
    },
    {
        id: 5,
        name: "Squat Rack",
        category: "strength",
        icon: "fa-square",
        status: "in-use",
        description: "Power rack with adjustable barbell holders and safety bars. Essential for building lower body strength through squats, the king of all exercises.",
        muscles: "Quadriceps, Hamstrings, Glutes, Core, Lower Back",
        difficulty: "Intermediate to Advanced",
        capacity: "1 person (spotter recommended)",
        sessionTime: "20-30 minutes",
        guidelines: [
            "Set bar at shoulder height on rack holders",
            "Load weight plates evenly on both sides, secure with collars",
            "Step under bar, position on upper traps (high bar) or rear delts (low bar)",
            "Grip bar firmly just outside shoulders",
            "Stand up to unrack, take 2-3 steps back",
            "Position feet shoulder-width apart, toes slightly out",
            "Breathe in, brace core, then descend by pushing hips back",
            "Lower until thighs are parallel to ground (or deeper if flexible)",
            "Drive through heels to stand back up",
            "Exhale at top, repeat for reps, re-rack carefully"
        ],
        proTips: [
            "Keep chest up and eyes forward throughout movement",
            "Knees should track over toes, not cave inward",
            "Imagine sitting back into a chair, not straight down",
            "Squeeze glutes hard at the top of each rep",
            "Use safety bars set just below your lowest position"
        ],
        benefits: [
            { icon: "fa-person-walking", text: "Builds powerful legs and lower body strength" },
            { icon: "fa-fire-flame-curved", text: "Burns massive calories (compound movement)" },
            { icon: "fa-bone", text: "Increases bone density in legs and spine" },
            { icon: "fa-chart-line", text: "Boosts testosterone and growth hormone" },
            { icon: "fa-heart", text: "Improves core stability and balance" },
            { icon: "fa-running", text: "Enhances athletic performance and jumping ability" }
        ],
        safety: [
            "ALWAYS set safety bars at appropriate height",
            "Use spotter for heavy weights or near-failure sets",
            "Start with bodyweight or empty bar to learn form",
            "Never round your lower back during squat",
            "Don't go too heavy too soon - ego lifting causes injuries",
            "Ensure path to rack is clear before unracking",
            "Bail safely if you can't complete a rep"
        ],
        dos: [
            "Warm up with dynamic stretches and light sets",
            "Keep entire foot flat on ground",
            "Maintain neutral spine throughout",
            "Breathe and brace before each rep",
            "Film yourself to check form"
        ],
        donts: [
            "Don't let knees cave inward (valgus collapse)",
            "Don't lean too far forward (chest collapsing)",
            "Don't lift heels off ground",
            "Don't squat with unstable or uneven weight",
            "Don't bounce at the bottom"
        ]
    },
    {
        id: 6,
        name: "Leg Press Machine",
        category: "strength",
        icon: "fa-circle-notch",
        status: "available",
        description: "Plate-loaded leg press machine with angled platform. Safer alternative to squats for building leg strength, especially for beginners or those with back issues.",
        muscles: "Quadriceps, Hamstrings, Glutes, Calves",
        difficulty: "Beginner to Advanced",
        capacity: "1 person",
        sessionTime: "15-20 minutes",
        guidelines: [
            "Adjust seat so knees are at 90 degrees when feet are on platform",
            "Place feet shoulder-width apart on platform, toes slightly out",
            "Grip handles on sides of seat",
            "Release safety locks while holding weight with legs",
            "Lower platform in controlled motion until knees are at 90 degrees",
            "Keep lower back pressed against seat pad",
            "Push through heels and extend legs (don't lock knees)",
            "Pause briefly at top, then lower for next rep",
            "Re-engage safety locks after completing set"
        ],
        proTips: [
            "Keep knees aligned with toes, don't let them cave in",
            "Don't lock out knees completely at top - maintain slight bend",
            "Higher foot placement targets glutes more",
            "Lower foot placement targets quads more",
            "Control the weight down, don't let it slam"
        ],
        benefits: [
            { icon: "fa-dumbbell", text: "Builds leg strength safely without spine load" },
            { icon: "fa-shield-halved", text: "Safer for those with back issues" },
            { icon: "fa-up-right-and-down-left-from-center", text: "Allows use of heavier weights" },
            { icon: "fa-arrows-up-down", text: "Isolates leg muscles effectively" },
            { icon: "fa-gauge-high", text: "Great for muscle hypertrophy" },
            { icon: "fa-person-walking-with-cane", text: "Useful for rehabilitation" }
        ],
        safety: [
            "Never let knees go past toes excessively",
            "Don't lower platform so far that lower back lifts off pad",
            "Always use safety locks when loading/unloading",
            "Load weight plates evenly on both sides",
            "Never lock knees at full extension",
            "Stop if you feel knee or back pain"
        ],
        dos: [
            "Keep head and back against pads",
            "Push through your heels, not toes",
            "Use full range of motion safely",
            "Breathe out while pushing up",
            "Start with lighter weight to test form"
        ],
        donts: [
            "Don't place feet too low or too high on platform",
            "Don't round your lower back",
            "Don't use momentum or bounce",
            "Don't train through knee pain",
            "Don't neglect the eccentric (lowering) phase"
        ]
    },
    {
        id: 7,
        name: "Cable Machine",
        category: "strength",
        icon: "fa-grip-lines-vertical",
        status: "available",
        description: "Dual cable crossover machine with adjustable pulleys. Versatile equipment for targeting muscles from various angles with constant tension.",
        muscles: "Full Body (Chest, Back, Shoulders, Arms, Core, Legs)",
        difficulty: "Beginner to Advanced",
        capacity: "1 person",
        sessionTime: "20-40 minutes",
        guidelines: [
            "Adjust pulleys to desired height for exercise",
            "Select appropriate weight on stack",
            "Attach handle or rope attachment to cable",
            "Position body at appropriate distance from machine",
            "Grip handle(s) and assume starting position for exercise",
            "Perform movement with controlled motion",
            "Maintain constant tension (don't let weights slam)",
            "Complete reps, carefully release handle",
            "Change pulley height/attachment for different exercises"
        ],
        proTips: [
            "Cables provide constant tension throughout movement",
            "Great for unilateral (single arm) training",
            "Experiment with different attachments: rope, bar, single handle",
            "Cables are excellent for core exercises",
            "Use for both strength and endurance training"
        ],
        benefits: [
            { icon: "fa-arrows-up-down-left-right", text: "Trains muscles from multiple angles" },
            { icon: "fa-arrow-trend-up", text: "Provides constant tension throughout range" },
            { icon: "fa-weight-hanging", text: "Versatile: chest, back, arms, shoulders, legs" },
            { icon: "fa-shield", text: "Safer than free weights for beginners" },
            { icon: "fa-circle-half-stroke", text: "Great for unilateral training (fixing imbalances)" },
            { icon: "fa-heart-pulse", text: "Excellent for muscle definition and toning" }
        ],
        safety: [
            "Ensure pulley pin is fully inserted",
            "Check cables for fraying or damage",
            "Don't let weight stack slam down",
            "Stand clear of weight stack during exercise",
            "Use appropriate weight - cables can feel deceptively light",
            "Maintain stable stance to avoid being pulled by cable"
        ],
        dos: [
            "Keep core engaged during all exercises",
            "Move smoothly without jerking",
            "Adjust weight incrementally",
            "Try different angles for same muscle group",
            "Use mirror to check form"
        ],
        donts: [
            "Don't use momentum to move weight",
            "Don't stand too far from machine",
            "Don't let cables cross or tangle",
            "Don't release handle abruptly",
            "Don't exceed your strength level"
        ]
    },
    {
        id: 8,
        name: "Dumbbells",
        category: "free-weights",
        icon: "fa-dumbbell",
        status: "available",
        description: "Complete set of dumbbells ranging from 5 lbs to 100 lbs. The most versatile strength training tool for building muscle, strength, and functional fitness.",
        muscles: "Full Body (All Major Muscle Groups)",
        difficulty: "Beginner to Advanced",
        capacity: "Multiple users",
        sessionTime: "20-60 minutes",
        guidelines: [
            "Select appropriate weight for your exercise and fitness level",
            "Always lift with proper form, not momentum",
            "Start with lighter weights if learning new exercise",
            "Use both dumbbells for balanced muscle development",
            "Return dumbbells to rack after use in proper order",
            "Wipe down dumbbells after use",
            "For exercises: maintain controlled motion up and down",
            "Breathe properly - exhale on exertion, inhale on release"
        ],
        proTips: [
            "Dumbbells allow for greater range of motion than barbells",
            "They help identify and correct strength imbalances",
            "Can be used for compound movements (multiple joints) or isolation",
            "Progress gradually - increase weight by 5-10 lbs at a time",
            "Focus on time under tension, not just weight lifted"
        ],
        benefits: [
            { icon: "fa-users-between-lines", text: "Improves muscle balance and symmetry" },
            { icon: "fa-hand-fist", text: "Builds functional, real-world strength" },
            { icon: "fa-arrows-up-down-left-right", text: "Allows natural movement patterns" },
            { icon: "fa-person-running", text: "Enhances coordination and stability" },
            { icon: "fa-weight-scale", text: "Effective for all fitness goals" },
            { icon: "fa-house", text: "Versatile - hundreds of exercises possible" }
        ],
        safety: [
            "Never drop dumbbells from height",
            "Keep fingers clear when racking weights",
            "Don't walk around gym carrying heavy dumbbells unnecessarily",
            "Place dumbbells on stable surface when not in use",
            "Check for loose or damaged parts before use",
            "Use appropriate weight - form breaks down if too heavy"
        ],
        dos: [
            "Warm up with lighter weights first",
            "Keep wrists neutral and strong",
            "Move through full range of motion",
            "Keep core engaged during exercises",
            "Place dumbbells carefully on ground/rack"
        ],
        donts: [
            "Don't swing or use momentum excessively",
            "Don't hold your breath during lifts",
            "Don't arch back excessively during overhead movements",
            "Don't let dumbbells collide during exercises",
            "Don't leave dumbbells on the floor as tripping hazards"
        ]
    },
    {
        id: 9,
        name: "Barbell Set",
        category: "free-weights",
        icon: "fa-minus",
        status: "available",
        description: "Olympic barbells (45 lbs) with complete plate set from 2.5 lbs to 45 lbs. Essential for compound movements and building maximum strength.",
        muscles: "Full Body (Ideal for Compound Movements)",
        difficulty: "Intermediate to Advanced",
        capacity: "1 person (spotter recommended)",
        sessionTime: "30-60 minutes",
        guidelines: [
            "Choose appropriate bar: Olympic (45 lbs) or standard",
            "Load plates evenly on both sides of bar",
            "Always use collars to secure plates",
            "Use squat rack, bench, or deadlift platform as appropriate",
            "Grip bar at appropriate width for exercise",
            "Maintain proper form throughout full range of motion",
            "Use spotter for exercises like bench press or squats",
            "Strip plates after use and return to rack",
            "Return bar to designated storage area"
        ],
        proTips: [
            "Barbells allow you to lift heavier weights than dumbbells",
            "Master form with empty bar before adding weight",
            "The bar itself weighs 45 lbs - include it in your total",
            "Use mixed grip (one over, one under) for heavy deadlifts",
            "Chalk hands for better grip if available"
        ],
        benefits: [
            { icon: "fa-weight-hanging", text: "Build maximum strength with compound lifts" },
            { icon: "fa-fire-flame-curved", text: "Burns maximum calories with heavy compound movements" },
            { icon: "fa-chart-line", text: "Increases muscle mass effectively" },
            { icon: "fa-trophy", text: "Improves overall athletic performance" },
            { icon: "fa-bone", text: "Builds bone density" },
            { icon: "fa-arrows-up-down", text: "Develops full-body functional strength" }
        ],
        safety: [
            "ALWAYS use collars to prevent plates from sliding",
            "Use spotter for bench press with heavy weights",
            "Set safety bars appropriately in racks",
            "Check bar and plates for damage before use",
            "Don't attempt lifts beyond your capability",
            "Learn proper lifting technique before going heavy",
            "Clear area around bar before lifting"
        ],
        dos: [
            "Warm up thoroughly before heavy lifts",
            "Chalk hands for better grip when needed",
            "Load and unload plates from both sides evenly",
            "Count total weight including bar",
            "Rest adequately between heavy sets"
        ],
        donts: [
            "Don't load weight unevenly on bar",
            "Don't forget to use collars",
            "Don't deadlift with rounded back",
            "Don't drop loaded bar from height",
            "Don't perform unfamiliar exercises without instruction"
        ]
    },
    {
        id: 10,
        name: "Kettlebell Set",
        category: "free-weights",
        icon: "fa-weight-hanging",
        status: "available",
        description: "Cast iron kettlebells from 10 lbs to 50 lbs. Unique shape perfect for dynamic, ballistic movements that build power, endurance, and functional strength.",
        muscles: "Full Body (Especially Core, Hips, Shoulders)",
        difficulty: "Beginner to Advanced",
        capacity: "Multiple users",
        sessionTime: "15-30 minutes",
        guidelines: [
            "Select kettlebell weight appropriate for exercise",
            "Grip handle firmly with full hand, not just fingers",
            "Keep wrist straight and strong during exercises",
            "Start with two-handed exercises before one-handed",
            "For swings: hinge at hips, don't squat",
            "Let kettlebell swing naturally, don't muscle it",
            "Keep core tight during all movements",
            "Return kettlebell to floor/rack carefully",
            "Clean kettlebell after use"
        ],
        proTips: [
            "Kettlebells are excellent for explosive, dynamic training",
            "Start lighter than you think - technique is crucial",
            "Perfect for HIIT (High-Intensity Interval Training)",
            "The offset center of mass engages stabilizer muscles",
            "Great for home workouts - compact and versatile"
        ],
        benefits: [
            { icon: "fa-bolt", text: "Builds explosive power and strength" },
            { icon: "fa-fire", text: "Burns massive calories with ballistic movements" },
            { icon: "fa-heart", text: "Improves cardiovascular and muscular endurance" },
            { icon: "fa-hand", text: "Strengthens grip and forearms significantly" },
            { icon: "fa-person-running", text: "Enhances functional fitness and mobility" },
            { icon: "fa-clock", text: "Time-efficient full-body workouts" }
        ],
        safety: [
            "Start with lighter weights to learn proper form",
            "Never swing kettlebell in crowded areas",
            "Maintain firm grip throughout exercises",
            "Don't let kettlebell flip over and hit wrist",
            "Keep area clear for dynamic movements",
            "Stop if you feel sharp pain in back or shoulders",
            "Place kettlebell down carefully, don't drop"
        ],
        dos: [
            "Warm up with mobility exercises first",
            "Master the hip hinge for swings",
            "Keep core braced during all movements",
            "Breathe rhythmically with movements",
            "Focus on power from hips, not arms"
        ],
        donts: [
            "Don't use arms to lift in swings - it's hip power",
            "Don't round your back during movements",
            "Don't swing kettlebell over shoulder height initially",
            "Don't sacrifice form for heavier weight",
            "Don't perform complex moves without instruction"
        ]
    },
    {
        id: 11,
        name: "Pull-up Bar",
        category: "functional",
        icon: "fa-up-long",
        status: "available",
        description: "Multi-grip pull-up and chin-up station. Bodyweight training essential for building back, arm, and core strength with various grip positions.",
        muscles: "Back (Lats), Biceps, Shoulders, Core, Forearms",
        difficulty: "Intermediate to Advanced",
        capacity: "1 person at a time",
        sessionTime: "10-20 minutes",
        guidelines: [
            "Choose grip width and style (overhand, underhand, neutral)",
            "Jump or step up to reach bar",
            "Hang with arms fully extended (dead hang)",
            "Engage lats by pulling shoulders down and back",
            "Pull body up until chin is above bar",
            "Pause briefly at top",
            "Lower body in controlled motion to full extension",
            "Don't use momentum or kipping (unless training CrossFit)",
            "Step off carefully after completing set"
        ],
        proTips: [
            "If you can't do full pull-ups, use resistance band assistance",
            "Practice dead hangs to build grip strength",
            "Vary grip width to target different muscles",
            "Chin-ups (underhand grip) are easier than pull-ups",
            "Engage core to prevent swinging"
        ],
        benefits: [
            { icon: "fa-person-arrow-up-from-line", text: "Builds impressive back width and strength" },
            { icon: "fa-hand-fist", text: "Develops strong biceps and forearms" },
            { icon: "fa-gauge-high", text: "Improves relative strength (strength-to-weight ratio)" },
            { icon: "fa-heart-pulse", text: "Functional exercise for real-world pulling" },
            { icon: "fa-arrows-up-down", text: "Decompresses spine through hanging" },
            { icon: "fa-trophy", text: "Builds mental toughness and determination" }
        ],
        safety: [
            "Ensure bar is securely mounted and stable",
            "Check weight capacity of pull-up bar",
            "Land carefully when dropping from bar",
            "Don't jump down from high bar - step down or have spotter assist",
            "Stop if you feel sharp pain in shoulders or elbows",
            "Grip bar firmly to prevent slipping",
            "Clear area below bar before starting"
        ],
        dos: [
            "Warm up shoulders with arm circles and stretches",
            "Use full range of motion (full extension to chin over bar)",
            "Keep core tight to prevent swinging",
            "Squeeze shoulder blades at top",
            "Progress gradually - even 1 pull-up is an achievement"
        ],
        donts: [
            "Don't use excessive momentum or swinging",
            "Don't shrug shoulders up to ears",
            "Don't only do partial reps (half reps don't count)",
            "Don't let go of bar unexpectedly",
            "Don't hyperextend at bottom"
        ]
    },
    {
        id: 12,
        name: "Battle Ropes",
        category: "functional",
        icon: "fa-grip-lines",
        status: "available",
        description: "Heavy-duty 50-foot training ropes for explosive full-body conditioning. Create waves, slams, and circles for intense metabolic training.",
        muscles: "Shoulders, Arms, Core, Back, Legs",
        difficulty: "Beginner to Advanced",
        capacity: "1 person (multiple ropes available)",
        sessionTime: "10-20 minutes",
        guidelines: [
            "Position yourself appropriate distance from anchor point",
            "Grab one rope end in each hand",
            "Stand with feet shoulder-width apart, slight knee bend",
            "Keep core engaged and back straight",
            "For alternating waves: move arms up and down alternately",
            "For double waves: slam both ropes down simultaneously",
            "Maintain rhythm and consistency",
            "Work in timed intervals (e.g., 30 seconds on, 30 seconds rest)",
            "Gradually increase intensity and duration"
        ],
        proTips: [
            "Use your whole body, not just arms - engage legs and core",
            "Keep movements explosive and powerful",
            "Try different patterns: waves, slams, circles, side-to-side",
            "Excellent finisher for workouts",
            "Perfect for HIIT and metabolic conditioning"
        ],
        benefits: [
            { icon: "fa-fire-flame-curved", text: "Burns 400-500 calories per 30 minutes" },
            { icon: "fa-bolt", text: "Builds explosive power and endurance" },
            { icon: "fa-heart-pulse", text: "Excellent cardiovascular conditioning" },
            { icon: "fa-arrows-up-down", text: "Low-impact yet high-intensity" },
            { icon: "fa-hand", text: "Strengthens grip and forearms" },
            { icon: "fa-person-running", text: "Improves athletic performance and coordination" }
        ],
        safety: [
            "Ensure ropes are securely anchored",
            "Check ropes for fraying or damage",
            "Maintain safe distance from anchor point",
            "Keep area clear of others during use",
            "Stop if you feel sharp pain in shoulders",
            "Stay hydrated - battle ropes are intense",
            "Don't overdo it - start with short intervals"
        ],
        dos: [
            "Warm up shoulders, arms, and core before use",
            "Keep knees slightly bent throughout",
            "Breathe consistently during work intervals",
            "Mix up movement patterns for variety",
            "Time your intervals for consistent training"
        ],
        donts: [
            "Don't lock your knees or stand too stiffly",
            "Don't use only your arms - engage whole body",
            "Don't work to complete exhaustion every set",
            "Don't ignore proper form for speed",
            "Don't forget to cool down after intense session"
        ]
    },
    {
        id: 13,
        name: "Medicine Balls",
        category: "functional",
        icon: "fa-basketball",
        status: "available",
        description: "Weighted medicine balls from 6 lbs to 30 lbs. Perfect for explosive movements, core training, and functional fitness exercises.",
        muscles: "Core, Chest, Shoulders, Arms, Legs",
        difficulty: "Beginner to Intermediate",
        capacity: "Multiple users",
        sessionTime: "15-25 minutes",
        guidelines: [
            "Select appropriate weight based on exercise",
            "Hold ball firmly with both hands",
            "Keep core engaged during all movements",
            "For wall throws: stand 3-4 feet from wall",
            "For slams: lift ball overhead and slam down forcefully",
            "For twists: rotate from core, not just arms",
            "For partner exercises: communicate clearly",
            "Clean ball after use",
            "Return to designated storage area"
        ],
        proTips: [
            "Medicine balls are excellent for power development",
            "Great for partner workouts and team training",
            "Use lighter balls for speed, heavier for power",
            "Excellent core training tool",
            "Can be used for cardio and strength training"
        ],
        benefits: [
            { icon: "fa-fire", text: "Burns calories through explosive movements" },
            { icon: "fa-bolt", text: "Develops explosive power and speed" },
            { icon: "fa-hand-fist", text: "Strengthens core and rotational power" },
            { icon: "fa-people-group", text: "Great for partner and group training" },
            { icon: "fa-person-running", text: "Improves coordination and athleticism" },
            { icon: "fa-heartbeat", text: "Provides variety to workout routine" }
        ],
        safety: [
            "Check ball for proper inflation/integrity",
            "Don't throw ball at other people unexpectedly",
            "Be aware of surroundings during slams and throws",
            "Use appropriate weight for your strength level",
            "Don't slam ball on unstable surface",
            "Keep fingers clear when catching ball",
            "Use mats for floor slams to protect floor"
        ],
        dos: [
            "Start with lighter balls to learn movements",
            "Use explosive, powerful movements",
            "Keep core tight during exercises",
            "Practice proper catching technique",
            "Warm up before explosive movements"
        ],
        donts: [
            "Don't use weight that compromises form",
            "Don't throw ball recklessly in crowded gym",
            "Don't slam ball directly on hard floor repeatedly",
            "Don't use damaged or deflated balls",
            "Don't forget to engage core in rotational movements"
        ]
    },
    {
        id: 14,
        name: "Foam Rollers",
        category: "functional",
        icon: "fa-scroll",
        status: "available",
        description: "High-density foam rollers for self-myofascial release, recovery, and mobility work. Essential recovery tool for reducing muscle soreness.",
        muscles: "All Major Muscle Groups (Recovery Tool)",
        difficulty: "Beginner to Advanced",
        capacity: "Multiple users",
        sessionTime: "10-20 minutes",
        guidelines: [
            "Place foam roller under target muscle group",
            "Support body weight with hands or other leg",
            "Slowly roll back and forth over muscle",
            "Pause on tender spots for 20-30 seconds",
            "Breathe deeply and relax into the pressure",
            "Roll each muscle group for 30-90 seconds",
            "Don't roll directly on joints or bones",
            "Use lighter pressure initially, increase as tolerated",
            "Clean roller after use"
        ],
        proTips: [
            "Roll BEFORE and AFTER workouts for best results",
            "Go slowly - it's about quality, not quantity of rolling",
            "More tender areas need more attention",
            "Can use roller for core exercises too",
            "Combine with stretching for better flexibility"
        ],
        benefits: [
            { icon: "fa-heart-pulse", text: "Reduces muscle soreness and stiffness" },
            { icon: "fa-person-running", text: "Improves flexibility and range of motion" },
            { icon: "fa-hand-sparkles", text: "Speeds up muscle recovery" },
            { icon: "fa-arrows-up-down-left-right", text: "Releases muscle tension and knots" },
            { icon: "fa-bed", text: "Reduces risk of injury" },
            { icon: "fa-circle-half-stroke", text: "Improves circulation and blood flow" }
        ],
        safety: [
            "Never roll directly over joints",
            "Don't roll lower back - use on mid/upper back only",
            "Avoid rolling injured areas without professional advice",
            "Stop if you feel sharp or shooting pain",
            "Don't roll too quickly or aggressively initially",
            "Be careful on bony areas",
            "Don't share roller without cleaning"
        ],
        dos: [
            "Roll major muscle groups: quads, hamstrings, calves, IT band",
            "Breathe deeply and relax muscles",
            "Spend extra time on tight spots",
            "Use after workouts when muscles are warm",
            "Make it part of your regular routine"
        ],
        donts: [
            "Don't roll if you have severe muscle injury",
            "Don't roll same spot for longer than 2 minutes",
            "Don't roll neck directly",
            "Don't ignore extreme pain - ease off pressure",
            "Don't rush through rolling session"
        ]
    }
];

// Global variables
let currentView = 'grid';
let currentFilter = 'all';
let currentSearchTerm = '';
let apiEquipmentData = null; // Equipment loaded from API

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    // Check authentication
    if (!isLoggedIn()) {
        window.location.href = 'index.html';
        return;
    }
    
    // Setup navigation
    if (typeof setupNavigation === 'function') {
        setupNavigation();
    }
    
    if (typeof setupUserInfo === 'function') {
        setupUserInfo();
    }
    
    if (typeof setupLogout === 'function') {
        setupLogout();
    }
    
    // Setup equipment functionality
    setupFilters();
    setupSearch();
    setupViewToggle();
    setupModal();
    loadEquipmentFromAPI();
});

// Load equipment from API first, then fallback to static data
async function loadEquipmentFromAPI() {
    const catalog = document.getElementById('equipmentCatalog');
    if (catalog) {
        catalog.innerHTML = '<div class="loading-equipment"><i class="fas fa-spinner fa-spin"></i> Loading equipment...</div>';
    }
    
    try {
        const response = await api.getEquipment({ limit: 100 });
        if (response.equipment && response.equipment.length > 0) {
            // Merge API data with static data for detailed info
            apiEquipmentData = response.equipment.map(apiEq => {
                const staticEq = equipmentData.find(eq => 
                    eq.name.toLowerCase() === apiEq.name.toLowerCase()
                );
                if (staticEq) {
                    return { ...staticEq, ...apiEq, status: apiEq.is_available ? 'available' : 'in-use' };
                }
                // If no matching static data, create basic structure
                return {
                    id: apiEq.id,
                    name: apiEq.name,
                    category: apiEq.category || 'general',
                    icon: getEquipmentIcon(apiEq.category),
                    status: apiEq.is_available ? 'available' : 'in-use',
                    description: apiEq.description || 'No description available.',
                    muscles: (apiEq.muscle_groups || []).join(', ') || 'Various',
                    difficulty: apiEq.difficulty_level || 'Beginner to Advanced',
                    capacity: '1 person',
                    sessionTime: '15-30 minutes',
                    guidelines: apiEq.instructions || [],
                    proTips: [],
                    benefits: [],
                    safety: apiEq.safety_tips || [],
                    dos: [],
                    donts: []
                };
            });
        }
    } catch (error) {
        console.log('Using static equipment data:', error.message);
    }
    
    loadEquipment();
}

function getEquipmentIcon(category) {
    const icons = {
        'cardio': 'fa-person-running',
        'strength': 'fa-dumbbell',
        'free-weights': 'fa-weight',
        'machines': 'fa-cogs',
        'flexibility': 'fa-child',
        'accessories': 'fa-box'
    };
    return icons[(category || '').toLowerCase()] || 'fa-dumbbell';
}

// Load and display equipment
function loadEquipment() {
    const catalog = document.getElementById('equipmentCatalog');
    if (!catalog) return;
    
    // Use API data if available, otherwise static data
    const dataSource = apiEquipmentData || equipmentData;
    
    // Filter equipment
    let filteredEquipment = dataSource;
    
    // Apply category filter
    if (currentFilter !== 'all') {
        filteredEquipment = filteredEquipment.filter(eq => eq.category === currentFilter);
    }
    
    // Apply search filter
    if (currentSearchTerm) {
        filteredEquipment = filteredEquipment.filter(eq => 
            eq.name.toLowerCase().includes(currentSearchTerm.toLowerCase()) ||
            eq.description.toLowerCase().includes(currentSearchTerm.toLowerCase())
        );
    }
    
    // Update count
    const countElement = document.getElementById('equipmentCount');
    if (countElement) {
        countElement.textContent = filteredEquipment.length;
    }
    
    // Clear catalog
    catalog.innerHTML = '';
    
    // Apply view class
    catalog.className = `equipment-catalog ${currentView}-view`;
    
    // Check if no equipment found
    if (filteredEquipment.length === 0) {
        catalog.innerHTML = '<div class="no-results"><i class="fas fa-search"></i><p>No equipment found matching your criteria</p></div>';
        return;
    }
    
    // Render equipment cards
    filteredEquipment.forEach(equipment => {
        const card = createEquipmentCard(equipment);
        catalog.appendChild(card);
    });
}

// Create equipment card
function createEquipmentCard(equipment) {
    const card = document.createElement('div');
    card.className = 'equipment-card';
    
    const statusClass = equipment.status === 'available' ? 'status-available' : 
                       equipment.status === 'in-use' ? 'status-in-use' : 'status-maintenance';
    const statusText = equipment.status.replace('-', ' ').toUpperCase();
    
    card.innerHTML = `
        <div class="equipment-icon">
            <i class="fas ${equipment.icon}"></i>
        </div>
        <div class="equipment-info">
            <h3>${equipment.name}</h3>
            <p class="equipment-category">
                <i class="fas fa-tag"></i>
                ${equipment.category.replace('-', ' ').toUpperCase()}
            </p>
            <p class="equipment-description">${equipment.description.substring(0, 100)}...</p>
            <div class="equipment-meta">
                <span class="equipment-muscles">
                    <i class="fas fa-bullseye"></i>
                    ${equipment.muscles.split(',')[0]}
                </span>
                <span class="equipment-difficulty">
                    <i class="fas fa-signal"></i>
                    ${equipment.difficulty}
                </span>
            </div>
        </div>
        <div class="equipment-footer">
            <span class="equipment-status ${statusClass}">
                <i class="fas fa-circle"></i> ${statusText}
            </span>
            <button class="btn btn-sm btn-primary view-details-btn" data-id="${equipment.id}">
                <i class="fas fa-info-circle"></i> View Details
            </button>
        </div>
    `;
    
    // Add click event to view details button
    const viewBtn = card.querySelector('.view-details-btn');
    viewBtn.addEventListener('click', () => showEquipmentDetail(equipment.id));
    
    return card;
}

// Setup filters
function setupFilters() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current filter
            currentFilter = this.dataset.category;
            
            // Reload equipment
            loadEquipment();
        });
    });
}

// Setup search
function setupSearch() {
    const searchInput = document.getElementById('equipmentSearch');
    
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            currentSearchTerm = this.value.trim();
            loadEquipment();
        });
    }
}

// Setup view toggle
function setupViewToggle() {
    const viewButtons = document.querySelectorAll('.view-btn');
    
    viewButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            viewButtons.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update current view
            currentView = this.dataset.view;
            
            // Reload equipment
            loadEquipment();
        });
    });
}

// Setup modal
function setupModal() {
    const modal = document.getElementById('equipmentDetailModal');
    const closeBtn = document.getElementById('closeDetailModal');
    const closeDetailBtn = document.getElementById('closeDetailBtn');
    const bookBtn = document.getElementById('bookEquipmentBtn');
    
    // Close modal events
    [closeBtn, closeDetailBtn].forEach(btn => {
        if (btn) {
            btn.addEventListener('click', () => {
                modal.classList.remove('active');
            });
        }
    });
    
    // Close on backdrop click
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Book equipment
    if (bookBtn) {
        bookBtn.addEventListener('click', () => {
            showNotification('Booking feature coming soon! Contact gym staff for equipment booking.', 'info');
        });
    }
    
    // Setup tabs
    const tabs = document.querySelectorAll('.equipment-tab');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.dataset.tab;
            
            // Remove active class from all tabs and panes
            tabs.forEach(t => t.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding pane
            this.classList.add('active');
            const targetPane = document.getElementById(targetTab + 'Tab');
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Show equipment detail modal
function showEquipmentDetail(equipmentId) {
    const equipment = equipmentData.find(eq => eq.id === equipmentId);
    if (!equipment) return;
    
    const modal = document.getElementById('equipmentDetailModal');
    
    // Populate modal with equipment data
    document.getElementById('detailIcon').innerHTML = `<i class="fas ${equipment.icon}"></i>`;
    document.getElementById('detailName').textContent = equipment.name;
    document.getElementById('detailCategory').textContent = equipment.category.replace('-', ' ').toUpperCase();
    
    const statusClass = equipment.status === 'available' ? 'status-available' : 
                       equipment.status === 'in-use' ? 'status-in-use' : 'status-maintenance';
    const statusBadge = document.getElementById('detailStatus');
    statusBadge.className = `equipment-status-badge ${statusClass}`;
    statusBadge.innerHTML = `<i class="fas fa-circle"></i> ${equipment.status.replace('-', ' ').toUpperCase()}`;
    
    // Overview tab
    document.getElementById('detailDescription').textContent = equipment.description;
    document.getElementById('detailMuscles').textContent = equipment.muscles;
    document.getElementById('detailDifficulty').textContent = equipment.difficulty;
    document.getElementById('detailCapacity').textContent = equipment.capacity;
    document.getElementById('detailSessionTime').textContent = equipment.sessionTime;
    
    // Guidelines tab
    const guidelinesContainer = document.getElementById('detailGuidelines');
    guidelinesContainer.innerHTML = equipment.guidelines.map((step, index) => `
        <div class="guideline-step">
            <div class="step-number">${index + 1}</div>
            <div class="step-content">${step}</div>
        </div>
    `).join('');
    
    const proTipsContainer = document.getElementById('detailProTips');
    proTipsContainer.innerHTML = equipment.proTips.map(tip => `<li>${tip}</li>`).join('');
    
    // Benefits tab
    const benefitsContainer = document.getElementById('detailBenefits');
    benefitsContainer.innerHTML = equipment.benefits.map(benefit => `
        <div class="benefit-item">
            <i class="fas ${benefit.icon}"></i>
            <p>${benefit.text}</p>
        </div>
    `).join('');
    
    // Safety tab
    const safetyContainer = document.getElementById('detailSafety');
    safetyContainer.innerHTML = equipment.safety.map(tip => `<li>${tip}</li>`).join('');
    
    const dosContainer = document.getElementById('detailDos');
    dosContainer.innerHTML = equipment.dos.map(item => `<li>${item}</li>`).join('');
    
    const dontsContainer = document.getElementById('detailDonts');
    dontsContainer.innerHTML = equipment.donts.map(item => `<li>${item}</li>`).join('');
    
    // Reset to overview tab
    document.querySelectorAll('.equipment-tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
    document.querySelector('[data-tab="overview"]').classList.add('active');
    document.getElementById('overviewTab').classList.add('active');
    
    // Show modal
    modal.classList.add('active');
}

// Notification function (if not available from main.js)
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-times-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}
