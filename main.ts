namespace SpriteKind {
    export const Unoverlappable = SpriteKind.create()
}
sprites.onCreated(SpriteKind.Unoverlappable, function (sprite) {
    sprite.setFlag(SpriteFlag.Ghost, true)
})
// Adds fast skip method
stateTransitions.onButtonEvent("DialogStart", stateTransitions.Player.One, stateTransitions.Button.B, ControllerButtonEvent.Pressed, function () {
    fancyText.cancelAnimation(DialogSprite)
    stateTransitions.changeState("DialogEndForce")
})
function CreateText (text: string) {
    if (ChunkLength < text.length) {
        CreateDialog(TextChunker(text))
    }
}
function TextChunker (text: string) {
    TextChunks = []
    for (let index = 0; index <= text.length; index++) {
        // checks if dividing is a whole number
        if (index % ChunkLength == 0) {
            // main splitter to add chunks to text
            TextChunks.push(text.substr(index, ChunkLength))
        }
    }
    return TextChunks
}
function CreateDialog (array: any[]) {
    DialogSprite = fancyText.create("blank", 150, 2, fancyText.tiny_4)
    fancyText.setMinLines(DialogSprite, 5)
    fancyText.setLineHeight(DialogSprite, 5)
    for (let value of array) {
        fancyText.setText(DialogSprite, value)
        stateTransitions.changeState("DialogStart")
        fancyText.animateAtSpeed(DialogSprite, fancyText.TextSpeed.Slow, fancyText.AnimationPlayMode.UntilDone)
        if (!(stateTransitions.stateIs("DialogEndForce"))) {
            stateTransitions.changeState("DialogEnd")
        }
        DialogCursor = sprites.create(img`
            2 2 2 
            3 3 3 
            . 3 . 
            `, SpriteKind.Unoverlappable)
        DialogCursor.setPosition(156, 110)
        animation.runMovementAnimation(
        DialogCursor,
        "m 0 0 l 0 -2 l 0 2",
        500,
        true
        )
        if (stateTransitions.stateIs("DialogEndForce")) {
            DialogPresses = 2
        } else {
            DialogPresses = 1
        }
        for (let index = 0; index < DialogPresses; index++) {
            // Waits for player to press button to continue text.
            pauseUntil(() => controller.A.isPressed() || controller.B.isPressed())
            // Waits for player to press button to continue text.
            pauseUntil(() => !(controller.A.isPressed()) && !(controller.B.isPressed()))
        }
        sprites.destroy(DialogCursor)
    }
    sprites.destroy(DialogSprite)
}
let DialogPresses = 0
let DialogCursor: Sprite = null
let TextChunks: string[] = []
let DialogSprite: fancyText.TextSprite = null
let ChunkLength = 0
// edit this to make each chunk bigger or smaller
ChunkLength = 150
CreateText("f vkdkd f knfkfdnkdf nf knfkf nfkk")
