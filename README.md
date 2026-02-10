# 🌩️ The Storm Room - Visual Anxiety Regulator

![The Storm Room Banner](https://img.shields.io/badge/The_Storm_Room-Visual_Anxiety_Regulator-blue)
![License](https://img.shields.io/badge/License-MIT-green)
![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)

> A therapeutic web application that visualizes anxiety as a storm and provides interactive tools to calm it through breathing exercises and grounding techniques.

## ✨ Features

### 🌩️ Interactive Storm Visualization
- **Dynamic Weather System**: Storm intensity changes based on anxiety level
- **Real-time Effects**: Rain, lightning, clouds, and sky color respond to slider input
- **Animated Elements**: Sun, rainbow, and landscape create an immersive experience

### 🧘 Breathing Exercises
- **Three Techniques**:
  - **Belly Breathing** (4-0-6): For basic relaxation
  - **Box Breathing** (4-4-4): For focus and balance
  - **4-7-8 Breathing** (4-7-8): For deep calm
- **Visual Feedback**: Animated breathing circle with countdown timer
- **Progress Tracking**: Visual indicators for inhale/hold/exhale phases

### 🧠 Grounding Exercises
- **Six Techniques**:
  - 5-4-3-2-1 Sensory Awareness
  - Mindful Breathing
  - Body Scan Meditation
  - Color Grounding
  - Temperature Grounding
  - Sound Meditation
- **Practice Timers**: Built-in timers for each exercise
- **"Done" Button**: Complete exercises early when ready

### 🎨 User Experience
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Accessible Interface**: Clear navigation and instructions
- **Therapeutic Design**: Calming color palette and intuitive controls

## 🚀 Live Demo

🌐 **[Try The Storm Room Now]([https://your-deployment-link.com](https://mckennamakran.github.io/the-storm-room/))** 

## 📋 Pages

1. **Home Page** (`index.html`) - Main interactive storm visualization
2. **Exercises Page** (`exercises.html`) - Grounding techniques and timers
3. **About Page** (`about.html`) - Explanation of therapeutic concepts
4. **Resources Page** (`resources.html`) - Additional help and information

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Icons**: Font Awesome 6
- **Fonts**: Google Fonts (Quicksand, Raleway)
- **Animations**: CSS Keyframes & JavaScript Intervals
- **Design**: Custom CSS with gradient backgrounds and glassmorphism effects

## 📁 Project Structure
storm-room/
├── index.html # Main application page
├── exercises.html # Grounding exercises page
├── about.html # About/Concept page
├── resources.html # Help resources page
├── styles.css # All CSS styles
├── script.js # Main JavaScript functionality
├── README.md # This file


## 🎮 How to Use

### Setting Your Anxiety Level
1. Move the **Storm Intensity** slider to match how you feel
2. Watch the storm visuals change in real-time
3. See rain intensity, lightning frequency, and sky color adjust

### Using Breathing Exercises
1. Select a breathing technique (Belly, Box, or 4-7-8)
2. Click **Start Breathing**
3. Follow the animated circle and countdown
4. Watch as the storm calms with each breath cycle

### Practicing Grounding
1. Navigate to **Exercises** page
2. Choose a grounding technique
3. Click **Practice Now** to start the timer
4. Follow the steps provided
5. Click **I'm Done** when finished, or wait for timer completion

## 🧪 Key Features Explained

### Storm Intensity Algorithm
The storm visualization uses a sophisticated algorithm to convert anxiety levels (0-100%) into visual elements:
- **Rain**: Starts at 30% intensity, increases linearly
- **Lightning**: Starts at 70% intensity, with probability scaling
- **Sky Color**: Gradient from light blue to dark stormy blue
- **Clouds**: Opacity increases with intensity

### Breathing Animation System
- **Inhale Phase**: Circle expands from 70% to 100% scale
- **Hold Phase**: Circle remains at full scale
- **Exhale Phase**: Circle contracts back to 70% scale
- **Storm Reduction**: Each completed breath cycle reduces storm intensity by 2%

### Progress Tracking
- Visual progress bar shows current breathing phase
- Countdown timers for each breathing phase
- Exercise completion tracking with visual feedback
