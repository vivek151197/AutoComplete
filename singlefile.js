function Node (value) {
  this.value = value
  this.endOfWord = false
  this.children = {}
}

class Trie {
  constructor (root) {
    this.root = new Node(null)
  }

  insert (word) {
    let current = this.root

    for (let character of word) {
      if (current.children[character] === undefined)
        current.children[character] = new Node(character)
      current = current.children[character]
    }

    current.endOfWord = true
  }

  capitalize = s => s && s[0].toUpperCase() + s.slice(1)

  contains (word) {
    prefix = this.capitalize(prefix)

    let current = this.root

    for (let character of word) {
      if (current.children[character] === undefined) return false
      current = current.children[character]
    }

    return current.endOfWord
  }

  getWords (node, string, array) {
    if (!node) return
    string += node.value
    if (node.endOfWord) array.push(string)
    for (let key in node.children) {
      this.getWords(node.children[key], string, array)
    }
    return array
  }

  findWords (prefix) {
    prefix = this.capitalize(prefix)
    let current = this.root
    let words = []

    for (let character of prefix) {
      if (current.children[character] === undefined) return 'Nomatch'
      current = current.children[character]
    }

    if (current.endOfWord) words.push(prefix)
    for (let key in current.children) {
      this.getWords(current.children[key], prefix, words)
    }

    return (words = words.sort())
  }
}

const trie = new Trie()

import { readFileSync } from 'fs'
const data = readFileSync('./countrylist.json', 'utf-8')
let normalData = JSON.parse(data)
normalData.forEach(value => {
  trie.insert(value)
})

import { start } from 'repl'
function myEval (cmd, context, filename, callback) {
  callback(null, trie.findWords(cmd.trim()))
}
start({ prompt: '> ', eval: myEval })
