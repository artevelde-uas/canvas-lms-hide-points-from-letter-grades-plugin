import { dom, router } from '@artevelde-uas/canvas-lms-app';

import t from './i18n';


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

            const letterGradeRegex = /^\s*\d+(?:(?:\.|\,)\d+)?\s+\((?<letter>.+)\)\s*$/;
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

    router.onRoute('courses.assignments', () => {
        dom.onElementAdded('.assignment_group .grade-display', gradeDisplay => {
            const letterGradeRegex = /^\s*(?<letter>[^\s%]+)\s*$/;
            const letter = gradeDisplay.textContent.match(letterGradeRegex)?.groups?.letter;

            if (letter === undefined) return;

            const scoreDisplay = gradeDisplay.parentElement.querySelector('.score-display');

            scoreDisplay.firstElementChild.textContent = '?';
        });
    });

    return {
        ...require('../package.json'),
        title: t('package.title'),
        description: t('package.description')
    };
}
