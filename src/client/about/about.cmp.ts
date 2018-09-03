export function AboutCmp() {
  return `
    <div class="about">
      <h1>About parQ</h1>
      <p>parQ is an application that helps companies solve the issues related to their parking lot.</p>
      <p>If your building has a limited quantity of parking cells, parQ allows users to add themselves into a "queue pool"  so, when someone has an assigned cell, our application allows the temporary owner to "release" the cell to be used by someone else on that day.</p>
      <p>parQ randomly picks a user from the queue, and assigns the first free cell to him, giving the user the freedom to decline or to take the spot.</p>
      <img src="/dist/assets/img/logo.svg" class="logo-about">
    </div>
  `;
}
