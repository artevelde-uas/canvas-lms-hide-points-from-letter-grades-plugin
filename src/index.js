import { dom, router, auth } from '@artevelde-uas/canvas-lms-app';

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

            // Determine the letter grade
            const letterGradeRegex = /^\s*\d+(?:(?:\.|\,)\d+)?\s+\((?<letter>.+)\)\s*$/;
            const letter = originalScore.textContent.match(letterGradeRegex)?.groups?.letter;

            if (letter === undefined) return;

            // Replace actual scores with just the letter grade
            scoreValue.textContent = letter;
            originalPoints.textContent = letter;
            originalScore.textContent = letter;
            whatIfScore.textContent = letter;

            // Replace actual scores after resetting 'what-if' scores
            dom.onClassRemoved(grade, () => {
                const textNode = grade.querySelector('.tooltip_wrap').previousSibling;

                textNode.textContent = letter;
            }, {
                filter: 'changed'
            });
        });
    });

    // Render on assignments page
    router.onRoute('courses.assignments', () => {
        dom.onElementAdded('.assignment_group .grade-display', gradeDisplay => {
            const scoreDisplay = gradeDisplay.parentElement.querySelector('.score-display');

            // Check if score element exists
            if (scoreDisplay.firstElementChild === null) return;

            // Replace actual grade with question mark
            scoreDisplay.firstElementChild.textContent = '?';

            // Add a tooltip on the score field
            scoreDisplay.title = t('actual_grade_hidden');

            jQuery(scoreDisplay).tooltip({
                position: { my: 'bottom-5', at: 'top' },
                tooltipClass: 'center top vertical'
            });
        });
    });

    // Remove scores from rubrics
    router.onRoute('courses.assignments.*', async () => {
        const isTeacher = await auth.isCourseTeacher();
        const isAdmin = auth.isAdmin();

        // Only apply fix for students
        if (isTeacher || isAdmin) return;

        // Remove elements with actual scores
        dom.onElementAdded('.react-rubric .rating-points', ratingPoints => {
            ratingPoints.remove();
        });
    });

    return {
        ...require('../package.json'),
        title: t('package.title'),
        description: t('package.description')
    };
}
