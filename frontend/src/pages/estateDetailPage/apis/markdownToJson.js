const formatKey = key => {
    if(key.includes('-') && key.trim().startsWith('-')){
        const [_,...restSplit] = key.split('-')
        return restSplit.join('-').trim()
    }
    return key.trim()
}
function parseGroup(markdown) {
    const lines = markdown.split('\n');
    const result = [];
    let currentItem = null;

    lines.forEach(line => {
        if (line.startsWith('- ')) {
            if (currentItem) {
                result.push(currentItem);
            }
            currentItem = {};
            const [key, value] = line.split('：');
            currentItem[formatKey(key)] = value.trim();
        } else if (currentItem && line.startsWith('    - ')) {
            const [key, value] = line.split('：');
            currentItem[formatKey(key)] = value.trim();
        }
    });

    if (currentItem) {
        result.push(currentItem);
    }

    return result;
}
function markdownToJson(markdown) {
    if(markdown.includes('\n\n')){
        return markdown.split('\n\n')
            .map(mdGroup => parseGroup(mdGroup)
            .reduce((acc, cur) => ({...acc, ...cur}), {}))
        
    }
    return parseGroup(markdown)
}
export function getDataFromMarkdown(simulatedScenarios){
    Object.entries(simulatedScenarios).forEach(([key,item]) => ({
        key,
        value:markdownToJson(item.report),
        hasDoubleEnter: item.report.includes('\n\n')

    }))
    return Object.entries(simulatedScenarios).reduce((acc,cur) => {
        const [key,item] = cur
        acc[key] = markdownToJson(item.report)
        return acc
    },{})
}