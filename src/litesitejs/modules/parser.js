// // // // SIMPLE RULES
const simpleRules = [
    // HORIZONTAL RULE
    [/^\*{3,}$/gm, '<hr />'], // horizontal rule: *** (or more than three)
    [/^\-{3,}$/gm, '<hr />'], // horizontal rule: --- (or more than three)
    [/^\_{3,}$/gm, '<hr />'], // horizontal rule: ___ (or more than three)

    // LINE BREAKS
    [/  (?:\r){0,1}\n/gs, '<br/>'],                      // breakline: two spaces before enter
    [/^(?:(?!#{1,6} ))(.*)(?:(?<!  ))$/gm, '<p>$1</p>'], // paragraph: not a heading

    // HEADINGS
    [/^###### (.*)$/gm, '<h6>$1</h6>'], // heading 6: ######
    [/^##### (.*)$/gm, '<h5>$1</h5>'],  // heading 5: #####
    [/^#### (.*)$/gm, '<h4>$1</h4>'],   // heading 4: ####
    [/^### (.*)$/gm, '<h3>$1</h3>'],    // heading 3: ###
    [/^## (.*)$/gm, '<h2>$1</h2>'],     // heading 2: ##
    [/^# (.*)$/gm, '<h1>$1</h1>'],      // heading 1: #

    // TEXT FORMATTING
    [/\*\*\*(.*?)\*\*\*/gm, '<strong><em>$1</em></strong>'], // strong and emphasis:  ***text***
    [/\*\*(.*?)\*\*/gm, '<strong>$1</strong>'],              // strong:               **text**
    [/\*(.*?)\*/gm, '<em>$1</em>'],                          // emphasis:             *text*
    [/___(.*?)___/gm, '<u><strong>$1</strong></u>'],         // strong and underline: ___text___
    [/__(.*?)__/gm, '<strong>$1</strong>'],                  // strong:               __text__
    [/_(.*?)_/gm, '<u>$1</u>'],                              // underline:            _text_
    [/~~(.*?)~~/gm, '<del>$1</del>'],                        // strikethrough:        ~~text~~
];

// // // // EMBED RULES
const embedRules = [
    // IMAGE EMBED
    [/!\[(.*?)]\((.*?) "(.*?)"\)/gm, '<img src="$2" title="$3" alt="$1"/>'],   // embed image: ![alt](src "title")
    [/!\[(.*?)]\((.*?)\)/gm, '<img src="$2" alt="$1"/>'],                      // embed image: ![alt](src)

    // HYPERLINKS
    [/\[(.*?)]\((.*?) "(.*?)"\)/gm, '<a href="$2" title="$3">$1</a>'], // embed link: [caption](href "title")
    [/\[(.*?)]\((.*?)\)/gm, '<a href="$2">$1</a>']                     // embed link: [caption](href)
]

export function parseMarkdown(text) {

    for (const rule of [...simpleRules, ...embedRules]) {
        text = text.replaceAll(rule[0], rule[1]);
    }

    return text;
}