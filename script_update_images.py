from pathlib import Path
from bs4 import BeautifulSoup
path = Path('tools.html')
text = path.read_text(encoding='utf-16')
soup = BeautifulSoup(text, 'html.parser')
repls = {
    'Clinic Revenue Leakage Calculator': 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=280&fit=crop',
    'Patient No-Show Cost Calculator': 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=600&h=280&fit=crop',
    'Healthcare Staff Productivity Calculator': 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&h=280&fit=crop',
    'Clinic Marketing ROI Calculator': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=280&fit=crop',
    'Treatment Cost Estimator': 'https://images.unsplash.com/photo-1584820927498-cfe5211fd8bf?w=600&h=280&fit=crop',
    'Clinic Growth Intelligence Dashboard': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=280&fit=crop',
    'Health Risk Assessment Tool': 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=280&fit=crop',
    'AI Appointment Assistant': 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=280&fit=crop',
    'Digital Token System': 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&h=280&fit=crop',
    'Property Affordability Calculator': 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=280&fit=crop',
    'Rental Yield Calculator': 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=600&h=280&fit=crop',
    'Property ROI Projection Tool': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=280&fit=crop',
    'Home Loan Eligibility Estimator': 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=600&h=280&fit=crop',
    'Property Comparison Dashboard': 'https://images.unsplash.com/photo-1582407947304-fd86f28320be?w=600&h=280&fit=crop',
    'Broker Lead Tracker': 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600&h=280&fit=crop',
    'Locality Intelligence Tool': 'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=600&h=280&fit=crop',
    'Should I Buy This Property? Analyzer': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=280&fit=crop',
    'PEB Budget Estimator': 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=280&fit=crop',
    'Warehouse Cost Estimator': 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&h=280&fit=crop',
    'Cold Storage ROI Calculator': 'https://images.unsplash.com/photo-1571847140471-1d7766e825ea?w=600&h=280&fit=crop',
    'Construction Timeline Estimator': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=280&fit=crop',
    'Steel Weight Calculator': 'https://images.unsplash.com/photo-1565008576549-57569a49371d?w=600&h=280&fit=crop',
    'BOQ Generator': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600&h=280&fit=crop',
    'Roofing Sheet Requirement Calculator': 'https://images.unsplash.com/photo-1632823469850-2f77dd9c7f93?w=600&h=280&fit=crop',
    'Industrial Project ROI Calculator': 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=280&fit=crop',
    'Course Eligibility Checker': 'https://images.unsplash.com/photo-1523580846011-d3a5bc25702b?w=600&h=280&fit=crop',
    'Scholarship Eligibility Tool': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=280&fit=crop',
    'Student Performance Dashboard': 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=280&fit=crop',
    'Exam Preparation Planner': 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=600&h=280&fit=crop',
    'Career Recommendation Tool': 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=600&h=280&fit=crop',
    'Admission Follow-Up': 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=280&fit=crop',
    'Marks Predictor': 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=280&fit=crop',
    'AI Stream Selector': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=280&fit=crop',
    'Student Inquiry Qualification Tool': 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=280&fit=crop'
}
for card in soup.select('.tool-card'):
    title_tag = card.find('h3')
    if not title_tag:
        continue
    title = title_tag.get_text(strip=True)
    if title not in repls:
        continue
    card_img = card.find('div', class_='card-img')
    if card_img:
        new_img = soup.new_tag('img', src=repls[title], alt=title)
        new_img['style'] = 'width:100%;height:200px;object-fit:cover;border-radius:12px 12px 0 0;'
        card_img.replace_with(new_img)
path.write_text(str(soup), encoding='utf-16')
