# Canvas LMS Hide Points From Letter Grades Plugin

Plugin for the [Canvas LMS theme app](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-app)
that hides points from students when using letter grades.

[![NPM version](https://img.shields.io/npm/v/@artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin)
[![License](https://img.shields.io/github/license/artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin.svg)](https://spdx.org/licenses/ISC)
[![Downloads](https://img.shields.io/npm/dt/@artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin.svg)](https://www.npmjs.com/package/@artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin/pulls)

## Installation

Using NPM:

    npm install @artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin

Using Yarn:

    yarn add @artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin

## Usage

Just import the plug-in and add it to the Canvas app:

```javascript
import canvas from '@artevelde-uas/canvas-lms-app';
import hidePointsFromLetterGradesPlugin from '@artevelde-uas/canvas-lms-hide-points-from-letter-grades-plugin';

canvas.addPlugin(hidePointsFromLetterGradesPlugin);

canvas.run();
```
