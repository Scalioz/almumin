from pathlib import Path
p = Path('tools.html')
text = p.read_text(encoding='utf-16')
print('OK')
print('IMG_COUNT', text.count('<img src="https://images.unsplash.com"'))
print('Clinic' in text, 'Course Eligibility Checker' in text, 'Student Performance Dashboard' in text)
