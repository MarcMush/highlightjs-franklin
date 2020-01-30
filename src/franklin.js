/*
Language: Franklin
Author: Marc Ittel <marc.ittel@gmail.com>
Description: 
Requires: xml.js, julia.js, markdown.js, python.js, plaintext.js, javascript.js, bash.js
Website: https://github.com/tlienart/Franklin.jl
*/

function(hljs) {


  CMD = {
    className: 'tag',
    variants: [
      {begin: /\\[^a-zA-Z\u0430-\u044f\u0410-\u042f0-9]/},
      {begin: /\\[a-zA-Z\u0430-\u044f\u0410-\u042f]+[*]?/}
    ]
  }

  return {
    aliases: ['judoc'],
    contains: [
      
      hljs.COMMENT(
        '<!--',
        '-->',
        {
          relevance: 5
        }
      ),
      // HTML injection
      {
        className: 'code',
        begin: '~~~',
        end: '~~~',
        excludeBegin: true, excludeEnd: true,
        subLanguage: 'xml',
        relevance: 10
      },
      // page variable definitions in Julia
      {
        begin: '^@def', 
        end: '$',
        subLanguage: 'julia',
        relevance: 10
      },
      // highlight headers
      {
        className: 'section',
        variants: [
          { begin: '^#{1,6}', end: '$' },
          { begin: '^.+?\\n[=-]{2,}$' }
        ]
      },
      // lists (indicators only)
      {
        className: 'bullet',
        begin: '^\\s*([*+-]|(\\d+\\.))\\s+'
      },
      // strong segments
      {
        className: 'strong',
        begin: '[*_]{2}.+?[*_]{2}'
      },
      // emphasis segments
      {
        className: 'emphasis',
        variants: [
          { begin: '\\*.+?\\*' },
          { begin: '_.+?_'
          , relevance: 0
          }
        ]
      },
      // blockquotes
      {
        className: 'quote',
        begin: '^>\\s+', end: '$'
      },
      // code snippets
      {
        className: 'code',
        variants: [
          {
            begin: '~~~',
            end: '~~~',
            // excludeBegin: true, excludeEnd: true,
            containts: [{subLanguage: 'xml'}],
            relevance: 10
          },
          {
            begin: '^`````\\w*\\s*$', end: '^`````[ ]*$'
          },
          {
            end: '^```\\s*$',
            excludeBegin: true, excludeEnd: true, 
            variants: 
            [
              {begin: '^```julia(:.*)?\\s*$', subLanguage: 'julia'},
              {begin: '^```julia-repl\\s*$', subLanguage: 'julia-repl'},
              {begin: '^```(ba)?sh\\s*$', subLanguage: 'bash'},
              {begin: '^```plaintext\\s*$', subLanguage: 'plaintext'},
              {begin: '^```py(thon)?\\s*$', subLanguage: 'python'},
              {begin: '^```(x|ht)ml\\s*$', subLanguage: 'xml'},
              {begin: '^```(js|javascript)\\s*$', subLanguage: 'javascript'},
              {begin: '^```(franklin|judoc)\\s*$', subLanguage: 'franklin'},

              // add other languages here

              {begin: '^```.*$', subLanguage: []}
            ]
          },
          {
            begin: '`.+?`'
          }
        ]
      },
      // horizontal rules
      {
        begin: '^[-\\*]{3,}', end: '$'
      },
      // using links - title and link
      {
        begin: '\\[.+?\\][\\(\\[].*?[\\)\\]]',
        returnBegin: true,
        contains: [
          {
            className: 'string',
            begin: '\\[', end: '\\]',
            excludeBegin: true,
            returnEnd: true,
            relevance: 0
          },
          {
            className: 'link',
            begin: '\\]\\(', end: '\\)',
            excludeBegin: true, excludeEnd: true
          },
          {
            className: 'symbol',
            begin: '\\]\\[', end: '\\]',
            excludeBegin: true, excludeEnd: true
          }
        ],
        relevance: 5
      },
      {
        begin: /^\[[^\n]+\]:/,
        returnBegin: true,
        contains: [
          {
            className: 'symbol',
            begin: /\[/, end: /\]/,
            excludeBegin: true, excludeEnd: true
          },
          {
            className: 'link',
            begin: /:\s*/, end: /$/,
            excludeBegin: true
          }
        ]
      },
      // \\
      {
        className: 'symbol',
        begin: '\\\\\\\\'
      },
      {
        className: 'selector-class',
        begin: '@@\\w*',
        relevance: 10
      },
      // latex-like commands
      CMD,
      // latex-like formulas
      {
        className: 'formula',
        begin: /[\$]{1,2}/,
        endSameAsBegin: true,
        contains: [
          CMD,
          {
            className: 'number',
            begin: '-?\\b\\d+(\\.\\d+)?'
          }
        ]
      },
    ]
  };
}
