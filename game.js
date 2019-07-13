var config = {
    type: Phaser.AUTO,
    width: 1000,
    height: 800,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);
var player;
var enemy;
var enemy2;
var enemy3;
var enemy4;
var time = 60;
var timeText;

function preload() {
    this.load.image('background', 'assets/background.png')
    this.load.image('enemy', 'assets/enemy.png');
    this.load.image('enemy2', 'assets/enemy2.png');
    this.load.image('enemy3', 'assets/enemy3.png');
    this.load.image('enemy4', 'assets/enemy4.png');
    this.load.spritesheet('player', 'assets/playersprite.png', { frameWidth: 50, frameHeight: 50 });

}

function create() {
    //background
    //player
    player = this.physics.add.sprite(500, 400, 'player');
    player.setCollideWorldBounds(true);
    this.anims.create({
        key: 'center',
        frames: [{ key: 'player', frame: 0 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'down',
        frames: [{ key: 'player', frame: 1 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: [{ key: 'player', frame: 2 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'up',
        frames: [{ key: 'player', frame: 3 }],
        frameRate: 20
    });

    this.anims.create({
        key: 'left',
        frames: [{ key: 'player', frame: 4 }],
        frameRate: 20
    });
    //input
    cursors = this.input.keyboard.createCursorKeys();
    //enemy
    enemy = this.physics.add.group({
        key: 'enemy',
        repeat: 4,
        setXY: { x: 25, y: 25, stepY: 100 }
    });
    //enemy collision
    this.physics.add.collider(player, enemy, Collision, null, this);
    this.physics.add.collider(enemy, enemy);
    //enemy2

    // time text
    timeText = this.add.text(652, 16, 'Time Remaining: ' + time, { fontSize: '32px', fill: '#FF0000' });
}

function update() {
    time -= 0.02;
    timeText.setText('TIME REMAINING: ' + time);
    if (cursors.left.isDown) {
        player.setVelocityX(-400);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(400);
        player.anims.play('right', true);
    } else if (cursors.up.isDown) {
        player.setVelocityY(-400);
        player.anims.play('up', true);
    } else if (cursors.down.isDown) {
        player.setVelocityY(400);
        player.anims.play('down', true);
    } else {
        player.setVelocityX(0);
        player.setVelocityY(0);
        player.anims.play('center');
    }
    if (time <= 0)
        window.location.href = 'EndGame.html';
}

function Collision() {
    window.location.href = 'GameOver.html';
}