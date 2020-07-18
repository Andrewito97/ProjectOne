/* eslint-disable no-undef */
import path from 'path';

export default function uploadFile(input, relativePath) {
	const filePath = path.join(__dirname, relativePath);
	const remoteFilePath = browser.uploadFile(filePath);
	input.addValue(remoteFilePath);
}
