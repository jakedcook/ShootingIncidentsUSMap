# 🔫 U.S. Mass Shooting Incidents — Interactive Data Visualization

An interactive D3.js-based web visualization that displays over 400 mass shooting incidents across the United States. This project combines a choropleth map and scatter plot to provide both high-level and detailed views of shooting density, geographic distribution, and incident-specific data.

---

## 🧠 Project Overview

- **Goal**: Visualize mass shooting incidents in the U.S. to identify geographic and demographic trends
- **Dataset**: "Gun Violence Dataset in US" from Kaggle (Kamran Ali), current through October 20, 2024
- **Frontend Tech**: D3.js, HTML/CSS, JavaScript
- **Backend/Processing**: Python and SQL for preprocessing (outside the scope of the final deployment)
- **Key Features**:
  - Choropleth shading by state to show shooting density
  - Red scatter points for individual incident locations
  - Interactive tooltips, zoom functionality, and a search bar

---

## 🎨 Design Process

The map was designed through iterative prototyping:
1. Started with a blank U.S. map
2. Added state-based density shading using ColorBrewer2
3. Overlaid individual shooting incidents as red points
4. Integrated interactive tooltips and zoom with state abbreviation search
5. Added stroke and hover features to help distinguish overlapping incidents
6. Implemented a “RESET” search input to return to full-map view

📌 **Design Rationale Highlights**:
- **Color Encoding**: Green gradient choropleth from low to high density
- **Red Circles**: For high-contrast incident locations
- **Legend & Tooltip Placement**: Prevent overlap and improve readability
- **Accessibility**: State abbreviations, consistent color scheme, and stroke outlines

---

## 💡 Key Insights from the Visualization

- States with highest densities: **Texas (TX)** and **California (CA)**
- Urban clusters: **Los Angeles**, **Chicago**, and **Houston** show the highest incident concentrations
- State-level zoom and tooltip data provide detailed incident info:
  - Victims killed/injured
  - Suspects involved
  - City/county and incident date

<img width="468" alt="image" src="https://github.com/user-attachments/assets/a8be5970-10af-4fad-86ca-42d78388d779" /> 

---

## 🌟 Features

- Dynamic choropleth with custom color scale for state density
- Red incident points with clickable tooltips
- Zoom by state abbreviation (e.g., "TX", "FL")
- “RESET” keyword resets to full-map view
- Search bar is always visible, even after zoom
- Legend, tooltip, and state label integration for clarity

---

## 🚀 Live Demo

👉 [Live Map Visualization (GitHub Pages or local demo video)](https://jakedcook.github.io/ShootingIncidentsUSMap/)

---

## 🔧 Technologies Used

- **D3.js** – Data-driven visualizations
- **HTML/CSS/JavaScript** – Web design and interactivity
- **ColorBrewer2** – Choropleth color palette
- **Map JSON** – TopoJSON/GeoJSON for U.S. map boundaries
- **Python** – Preprocessing and cleaning (off-GitHub)

---

## 📈 Future Improvements

- Add filtering options for:
  - Fatalities
  - Injuries
  - Suspect data
- Add time slider for dynamic monthly/yearly analysis
- Implement smoother transitions between state and national views
- Include demographic overlays (e.g., population density, income, etc.)
<img width="468" alt="image" src="https://github.com/user-attachments/assets/efc5b90b-b01d-4ff5-b168-a07aa916e913" />



