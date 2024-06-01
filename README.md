# kxie0860_9103_MajorProject

## Part 1: Instructions 
I have chosen the "Time: Employ timers and events for animation" individual approach, simulating transitions between day and night in my work. The animation cycles every 12 seconds:

1-3 seconds:

Transition from day to night.
Seagulls gradually disappear.
Water waves appear in white and purple.
3-9 seconds: Night

Windows of the building light up.
Random fireworks bloom in the sky.
The building is highlighted with a yellow edge.
Water waves turn yellow.
9-12 seconds:

Transition from night to day.
Lights on the building turn off.
Fireworks stop.
Seagulls gradually appear.
Water waves appear in white and purple again.
## Part 2: Individual Approach of Animation
Properties of the Image Animated and How:

I made modifications to various components of the group coding:

GradientWave: Adjusted the gradient colors of sky and sea to match my project's style, creating a more nuanced scene.
Building: Added functionality for the windows to light up using lightup() during nighttime.
WaveBrush: Created waves of different colors, smoothly adjusting their size based on noise. Colors transition differently between day and night.
Seagull: Added a parameter to control the opacity, changing over time.
Additional Classes Added:

Night Mask: A scaling transparent gradient night mask to create day and night effects.
Firework: Generates random fireworks of various sizes.
## Part 3: Inspiration
My inspiration comes from Disney fireworks, where the buildings exhibit different lighting effects under the fireworks, creating a beautiful scene.

## Part 4: Technical Explanation
I referred to a YouTube tutorial for creating fireworks effects. It involves generating particles of different colors and directions, adding animation for vertical movement along the y-axis, and gradual opacity changes to simulate fireworks. I made two main modifications:
1. Introduced time events to automatically generate fireworks at random intervals using frameCount.
2. Added a size parameter to generate fireworks of different sizes.

