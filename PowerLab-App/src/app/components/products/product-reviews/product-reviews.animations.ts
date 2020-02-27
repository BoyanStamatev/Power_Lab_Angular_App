import {
    trigger,
    animate,
    transition,
    style,
    group
} from '@angular/animations'

const animations = [
    trigger('reviews', [
        transition('void=>*', [
            style({
                backgroundColor: 'green',
                transform: 'translateX(-50px)',
                opacity: 0
            }),
            animate(1000)
        ]),

        transition('*=>void', [
            animate(1000, style({
                backgroundColor: 'red',
                transform: 'translateX(100px)',
                opacity: 0
            }))
        ])
    ])
]

export { animations }