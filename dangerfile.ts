import { message, danger } from 'danger';

const modifiedMD = danger.git.modified_files.join('\n- ');
message('Changed files in this PR: \n' + modifiedMD);
