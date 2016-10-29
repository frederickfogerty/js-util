'use strict';
const execa = require('execa');
const Listr = require('listr');
const split = require('split');
require('any-observable/register/rxjs-all');
const Observable = require('any-observable');
const streamToObservable = require('stream-to-observable');
const fs = require('fs-extra-promise');
const path = require('path');

const exec = (cmd, args) => {
	// Use `Observable` support if merged https://github.com/sindresorhus/execa/pull/26
	const cp = execa(cmd, args);

	return Observable.merge(
		streamToObservable(cp.stdout.pipe(split()), { await: cp }),
		streamToObservable(cp.stderr.pipe(split()), { await: cp })
	).filter(Boolean);
};
const DIST_DIR = 'dist';

function copyToDist(filePath) {
	return fs.copyAsync(filePath, path.join(DIST_DIR, filePath)).catch(() => Promise.resolve());
}

const tasks = [
	{
		title: 'Copy files',
		task: () => Promise.all(
			['package.json', 'LICENSE', '.npmignore', 'README.md', 'CHANGELOG.md', 'changelog.md']
				.map(copyToDist)
		)
	},
	{
		title: 'Change to dist folder',
		task: () => exec('cd', ['dist'])
	},
	{
		title: 'npm publish',
		task: exec('npm', ['publish'].concat(opts.tag ? ['--tag', opts.tag] : []))
	}
]

new Listr(tasks).run()
