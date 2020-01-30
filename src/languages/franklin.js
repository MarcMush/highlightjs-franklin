/*
Language: Franklin
Author: Marc Ittel <marc.ittel@gmail.com>
Requires: xml.js, julia.js, markdown.js, python.js, plaintext.js, javascript.js, bash.js
Website: https://github.com/tlienart/Franklin.jl
Description: Close to markdown (many elements taken in markdown.js) with other functionnalities to work with Franklin.jl
*/

function(hljs) {
  var languages = [['julia-repl'], 
                   ['markdown', 'md', 'mkdown', 'mkd'],
                   ['javascript', 'js'],
                   ['python', 'py'], 
                   ['xml', 'html'],
                   ['bash', 'sh'],
                   ['plaintext']
                  ]

  var lang_variants = [
    {
      begin: '^```julia(:.*)?\\s*$', end: '^```\\s*$',
      excludeBegin: true, excludeEnd: true, 
      subLanguage: 'julia'
    },
    {
      begin: '^```(franklin|judoc)\\s*$', end: '^```\\s*$',
      excludeBegin: true, excludeEnd: true, 
      subLanguage: 'franklin'
    }
  ]
  for (var lang of languages)
  {

    lang_variants.push(
      {
        begin: '^```(' + lang.join('|') +')\\s*$', end: '^```\\s*$',
        excludeBegin: true, excludeEnd: true, 
        subLanguage: lang[0]
      }
    )
  }

  lang_variants.push(
    {
      begin: '^```.*$', end: '^```\\s*$',
      excludeBegin: true, excludeEnd: true, 
      subLanguage: []
    }
  )

  COMMAND = {
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
          relevance: 0
        }
      ),
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
            excludeBegin: true, excludeEnd: true,
            subLanguage: 'xml',
            relevance: 10
          },
          {
            begin: '^`````\\w*\\s*$', end: '^`````\\s*$'
          },
          ...lang_variants,
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
      COMMAND,
      // latex-like formulas
      {
        className: 'formula',
        begin: /[\$]{1,2}/,
        endSameAsBegin: true,
        contains: [
          COMMAND,
          {
            className: 'number',
            begin: '-?\\b\\d+(\\.\\d+)?'
          }
        ]
      },
    ]
  };
}
