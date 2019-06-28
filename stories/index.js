import { h } from 'preact';
import { storiesOf } from '@storybook/preact';
import { FeedbackModule } from '../src/components/feedback-modal';
import { Sidebar } from '../src/components/sidebar';

/* TODO */

storiesOf('FeedbackModule', module)
	.add('normal', () => {
		<FeedbackModule />
	});

storiesOf('Sidebar', module)
	.add('normal', () => (
		<Sidebar />
	));
