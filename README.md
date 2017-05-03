# Ms Pacman

### Background
Ms. Pacman is a clone of the classic arcade game by Namco. One must navigate around the board to 'eat' all the dots without getting caught by the ghosts.

### Functionality & MVP
Users will be able to:

- [ ] Move around the maze-like board and get points for collecting ('eating') the dots on the board
- [ ] Start and pause the game board
- [ ] Change the game state by 'eating' one of the big dots; in the changed game state, user will be able to gain points by 'eating' ghosts

In addition:

- [ ] Each of the four ghosts will use different logic that determines how they 'chase' Ms. Pacman
- [ ] Ghosts should get better at 'chasing' Ms. Pacman as the level increases

### Wireframes

This ap will consist of a single scree with game board, game controls, and nav links to the Github, my LinkedIn, and my homepage. Game controls will include Start, Pause, and moving the Ms. Pacman icon. Above the game board will be a number that represents the player's score. On the bottom of the screen, the number of lives the player has left will be shown using Ms. Pacman icon (with each icon representing a separate life).

### Architecture and Technologies

This project will be implemented with the following technologies:

-  Javascript for the game logic,
-  HTML 5 Canvas to generate the the board/maze

### Implementation Timeline

**Day 1**: Create the maze, Ms. Pacman, and ghosts

- Create the maze
- Create Ms. Pacman and ghosts
- Create logic to allow user to move around and consume dots
- Create basic UI Framework, which includes the board, high score display, and lives remaining

**Day 2**: Scoring, toggle game state change, enemy attack logic
- Have user's score increase as they consume more dots
- Toggle game state when user 'consumes' a 'big dot', which allows the user to 'eat' ghosts
- Begin working on enemy attack logic that determines how each ghost will 'chase' Ms. Pacman

**Day 3**: Finish enemy attack logic, create screens/modals for various game events (game over, next level), implement sound effects
- Finish working on enemy attack logic
- Create screens for when user is out of lives (Game Over) and for when user consumes all the dots on the board (Next Level)
- BONUS: Implement sound effects and music
