const fs = require('fs');
const path = require('path');

const walkSync = (dir, filelist = []) => {
  fs.readdirSync(dir).forEach(file => {
    const dirFile = path.join(dir, file);
    try {
      filelist = walkSync(dirFile, filelist);
    } catch (err) {
      if (err.code === 'ENOTDIR' || err.code === 'EBADF') filelist.push(dirFile);
    }
  });
  return filelist;
};

const files = walkSync('./src').filter(f => f.endsWith('.tsx') || f.endsWith('.ts'));

let changedFiles = 0;

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  const orig = content;
  
  // Replace different structural borders with border-[var(--border-subtle)]
  // We want to replace:
  // border-white/10, border-white/5, border-white/20 (unless hover)
  // border-black/[0.06], border-black/[0.07], border-black/[0.08], etc.
  // border-border, border-border/50
  // border-muted, border-muted/30
  // border-gray-100, border-gray-200, border-slate-200, etc.
  
  const regex = /border-\[var\(--border-subtle\)]|border-subtle/g;
  
  content = content.replace(regex, 'border-border');
  
  // Special arbitrary colors like border-[rgba(...)] or border-[#...] might be there, let's leave them unless we're sure.
  // We also replace any duplicate border-[var(--border-subtle)]
  
  if (content !== orig) {
    fs.writeFileSync(file, content, 'utf8');
    changedFiles++;
    console.log(`Updated ${file}`);
  }
});

console.log(`Done. Updated ${changedFiles} files.`);
