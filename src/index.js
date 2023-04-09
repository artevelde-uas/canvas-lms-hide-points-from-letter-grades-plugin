import { dom, router } from '@artevelde-uas/canvas-lms-app';


export default function () {

    // Render on grades page
    router.onRoute('courses.grades', () => {
        dom.onElementAdded('.score_holder', scoreHolder => {
            const grade = scoreHolder.querySelector('.grade');
            const scoreValue = scoreHolder.querySelector('.score_value');
            const originalPoints = scoreHolder.querySelector('.original_points');
            const originalScore = scoreHolder.querySelector('.original_score');
            const whatIfScore = scoreHolder.querySelector('.what_if_score');

            if (scoreValue === null) return;

            const letterGradeRegex = /\d+(?:(?:\.|\,)\d+)?\s+\((?<letter>.+)\)/;
            const letter = originalScore.textContent.match(letterGradeRegex)?.groups?.letter;

            if (letter === undefined) return;

            scoreValue.textContent = letter;
            originalPoints.textContent = letter;
            originalScore.textContent = letter;
            whatIfScore.textContent = letter;

            dom.onClassRemoved(grade, () => {
                const textNode = grade.querySelector('.tooltip_wrap').previousSibling;

                textNode.textContent = letter;
            }, {
                filter: 'changed'
            });
        });
    });

    return require('../package.json');
}
