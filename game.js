const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}

function startGame() {
  state = {}
  showTextNode(1)
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex)
  textElement.innerText = textNode.text
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild)
  }

  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button')
      button.innerText = option.text
      button.classList.add('btn')
      button.addEventListener('click', () => selectOption(option))
      optionButtonsElement.appendChild(button)
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

function selectOption(option) {
  const nextTextNodeId = option.nextText
  if (nextTextNodeId <= 0) {
    return startGame()
  }
  state = Object.assign(state, option.setState)
  showTextNode(nextTextNodeId)
}

const textNodes = [
  {
    id: 1,
    text: 'You wake up in your car that you crashed suddenly. A firearm had fallen out the glovebox.',
    options: [
      {
        text: 'Take the firearm',
        setState: { firearm: true },
        nextText: 2
      },
      {
        text: 'Leave the Firearm',
        nextText: 2
      }
    ]
  },
  {
    id: 2,
    text: 'You look around for any way to get out the car.',
    options: [
      {
        text: 'You get out the drivers seat and shoot at the first zombie you see.',
        requiredState: (currentState) => currentState.firearm,
        setState: { firearm: false,  },
        nextText: 3
      },
      {
        text: 'You get out the backseat and shoot at the first zombie you see.',
        requiredState: (currentState) => currentState.firearm,
        setState: { firearm: false,  },
        nextText: 3
      },
      {
        text: 'You quietly get out the car and sneak by any zombies you see.',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: 'You hear sirens coming your way. You decide to but there are zombies everywhere so you decide to...',
    options: [
      {
        text: 'Run straight for the sirens coming your way',
        nextText: 4
      },
      {
        text: 'Give up ',
        nextText: 5
      },
      {
        text: 'see a tree you could climb up to',
        nextText: 6
      }
    ]
  },
  {
    id: 4,
    text: 'You did not see a Zombie on the floor and end up getting bit.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 5,
    text: 'You let yourself get bitten by one of the dead and turn',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 6,
    text: 'You climb up the tree and wait patiently for the sirens to be in sight.',
    options: [
      {
        text: 'You jump down',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: 'The sirens get in view and you jump down and begin to sprint towards the firetruck heading your way',
    options: [
      {
        text: 'You Try to run',
        nextText: 8
      },
      {
        text: 'You shoot your firearm',
        requiredState: (currentState) => currentState.firearm,
        nextText: 9
      },
      {
        text: 'You hide behind the tree you jumped down from',
        requiredState: (currentState) => currentState.firearm,
        nextText: 10
      },
      {
        text: 'You shoot the zombie on the floor and sprint to the firetruck coming your way.',
        requiredState: (currentState) => currentState.firearm,
        nextText: 11
      }
    ]
  },
  {
    id: 8,
    text: 'You get bitten on the leg',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 9,
    text: 'You attract more of the dead and end up getting bitten by many different directions and become a feast for the dead.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 10,
    text: 'You forgot to check behind you when you hid and get bitten in the neck.',
    options: [
      {
        text: 'Restart',
        nextText: -1
      }
    ]
  },
  {
    id: 11,
    text: 'You get onto the firetruck and it takes you to a nearby survivor camp where you live out your days till the next crisis takes place.',
    options: [
      {
        text: 'Congratulations. Play Again.',
        nextText: -1
      }
    ]
  }
]

startGame() 