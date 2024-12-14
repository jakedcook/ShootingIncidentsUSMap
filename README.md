## Design Process
To begin the visualization project, I focused on creating a geographic representation of mass shooting incidents across the United States to ensure the map was both informative and visually precise. For the visualization, I used the “Gun Violence Dataset in US” dataset from Kaggle, created by Kamran Ali, which provides detailed information for mass shootings in the United States up to October 20th, 2024. This dataset includes fields such as incident ID, date, state, city/county, victims killed or injured, suspects involved, geographic coordinates, and whether coordinates were found.
The design process progressed in iterative steps. I started with a simple map outline of the United States and then integrated the data to ensure incidents were plotted correctly. Features were added incrementally, including tooltips for detailed incident information, which became interactive by disappearing upon clicking outside the incident points. The tooltip also highlights the selected point by changing its color for clarity. A color scale was introduced to represent shooting density per state, complemented by a legend for interpretation. Lastly, a search bar with a zoom functionality was added, allowing users to focus on specific states by entering their abbreviations. Despite various attempts to enhance transitions, smoothly returning from a state-level zoom to the full map proved too complex, so I implemented a "reset" feature to restore the default view.
Through iterative design, I ultimately selected a hybrid of a choropleth map and scatter plot. The choropleth map provides a high-level overview of shooting densities by state, while scatter points represent individual incidents with details available via tooltips. Key refinements included the addition of state labels for clarity, a search bar to improve interactivity, and accessible color choices for easy interpretation. 

## Rationale of Design Choices
In order to create a meaningful visualization, specific design choices were made to enhance clarity and usability. For color encoding, a sequential color scale from ColorBrewer2 was used in the choropleth map to represent the number of shootings per state. This scale ranged from light grey/green for low density to dark green for high density, ensuring clarity in understanding density levels and letting users identify states with higher incidences. For individual incidents, red circles were plotted to show the location of the shootings and signify urgency to attract attention. These individual points were made interactive: when selected, a tooltip displays key information about the incident, including the date, state, city/county, victims killed, victims injured, suspects killed, suspects injured, and suspects arrested.

<img width="112" alt="image" src="https://github.com/user-attachments/assets/3f17e226-1063-4269-b4d5-93abf3ae31b3" />

To ensure better usability, a legend for the color scale was positioned in the top-left corner of the screen. This placement was chosen so the tooltip, which appears in the top-right corner when an incident is selected, does not overlap or obstruct other information.

<img width="468" alt="image" src="https://github.com/user-attachments/assets/efc5b90b-b01d-4ff5-b168-a07aa916e913" />

Additionally, state abbreviations were added to aid users who may not recognize states geographically, making it easier to use the search bar, which allows users to zoom into a specific state by typing its abbreviation. This zoom functionality helps differentiate incidents in densely affected areas where points may overlap. A stroke was added to the circles to further aid in distinguishing closely stacked incidents. 

<img width="468" alt="image" src="https://github.com/user-attachments/assets/a8be5970-10af-4fad-86ca-42d78388d779" />

The map also features a reset functionality, allowing users to return to the original view by typing "RESET" into the search bar. Lastly, a link to the live demonstration video was added outside of the map element to ensure it is always visible, regardless of zoom view. These design decisions collectively enhance interactivity, clarity, and user experience.

## Findings from the Visualizations
Using the visualization, several insights were discovered. At the state level, Texas ("TX") and California ("CA") have the highest densities of incidents, evident from their dark green shading in the choropleth map. Urban areas such as Los Angeles, Chicago, and Houston exhibit higher shooting frequencies, as shown by the denser red scatter points in these regions. For example, using the search bar to focus on Florida ("FL") revealed several incidents concentrated in Miami and Orlando.

<img width="468" alt="image" src="https://github.com/user-attachments/assets/0bd1cab4-e313-4f35-8fb2-418a7ebb8119" />

The visualization answered key questions, such as identifying states with the highest density of shootings (Texas and California) and confirming that shootings are concentrated in urban areas. This interactive exploration provided valuable insights into the distribution of incidents.

## Conclusions
The visualization successfully combines geographic and interactive elements to provide a comprehensive view of mass shooting incidents in the United States. The choropleth map offers a high-level perspective, while scatter points and tooltips provide detailed insights. The design choices prioritize accessibility, interactivity, and clarity, enabling users to explore and understand the data effectively.

## Future Improvements

Future enhancements could include incorporating the zoom reset feature to smoothly return to the us-map from the state-map, adding filters for variables such as fatalities and injuries, and adding time sliders to analyze incidents by month.
