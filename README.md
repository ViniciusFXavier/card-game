# Card-Game - Challenge

<table cellspacing="0" cellpadding="0" style="border-collapse:collapse;border-spacing:0;border: none!important;">
  <thead>
    <tr>
      <th colspan="2">
        Personal challenge: Build a card game inspired by Stacklands in less than 8 hours
      </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td rowspan="2">
        <!-- Example Image -->
        <a href="https://ViniciusFXavier.github.io/card-game/">
          <img src="https://github.com/user-attachments/assets/3e26503b-0b36-45d3-b3f4-3f54b1ea9dc1" alt="Card-Game - Challenge" width="1500">
        </a>
      </td>
      <td>
      While browsing Steam, I was inspired by the game <a href="https://store.steampowered.com/app/1948280/Stacklands/">Stacklands</a> and decided to challenged myself to build a similar experience from scratch in 8 hours.
      </td>
    </tr>
    <tr>
      <td>
        <b>Project Breakdown:</b>
        <ul>
          <li><b>Base Structure (15%):</b> Created a dynamic canvas with infinite panning ("camera" movement) and zoom capabilities. This required complex calculations to ensure smooth, integrated functionality.</li>
          <li><b>Cards (80%):</b> Engineered a robust system for creating and manipulating cards, handling positioning, grouping, and item production based on custom combination rules.</li>
          <li><b>Architecture Setup (5%):</b> Established the overall project structure and architecture. Initially, I planned an event-driven design, but ultimately chose to use native page events exclusively for mouse control.</li>
        </ul>
        Reference Game: <a href="https://store.steampowered.com/app/1948280/Stacklands/">Stacklands</a>
        <br /> Play now: <a href="https://ViniciusFXavier.github.io/card-game/">https://ViniciusFXavier.github.io/card-game/</a>
      </td>
    </tr>
    <tr>
      <td colspan="2">
        <b>Current Functionalities:</b>
        <ul>
          <li>An infinite board with full Panning ("camera" movement) and Zoom control.</li>
          <li>A card configuration system that defines each card type, its possible connections, and production blueprints when cards are combined.</li>
          <li>Ability to move individual cards as well as stacks of cards.</li>
          <li>Options to ungroup and regroup stacks of cards.</li>
          <li>When a card is selected, possible combinations are highlighted with a dashed border.</li>
        </ul>
        <b>TODO:</b>
        <ul>
          <li>Fix the z-index issue when stacking several cards.</li>
          <li>Create a collision system so cards do not overlap (allowing one card to push another).</li>
          <li>Add boundaries to the board and limit the zoom and panning ("camera" movement) (currently is all infinite).</li>
          <li>Improve card visuals, as they currently only display the color and the name of card in the center.</li>
        </ul>
        <b>Item & Crafting Examples:</b>
        <ul>
          <li>
            Combining <b>1 Tree</b> with <b>1 Villager</b> produces <b>Wood</b> (100% chance) and an <b>Apple</b> (20% chance) in <b>5 seconds</b>.
          </li>
          <li>
            A <b>Campfire</b> is crafted by joining <b>2 Stick</b> and <b>1 Flint</b> along with a <b>Villager</b> working on it, taking <b>10 seconds</b>.
          </li>
          <li>
            A <b>Baby</b> is created by combining <b>2 Villagers</b> in a <b>House</b>, taking <b>30 seconds</b>.
          </li>
          <li>
            A <b>Villager</b> is produced by combining <b>1 Baby</b> in a <b>House</b>, growing in <b>60 seconds</b>.
          </li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>
