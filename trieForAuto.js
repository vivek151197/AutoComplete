//TODO: Make this as a class for consistency or the below Trie class as function
class Node {
  constructor (value) {
    this.value = value
    this.isEndOfWord = false
    this.children = {}
  }
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

    current.isEndOfWord = true
  }
  // TODO:  remove capitalize and compare using toLowercase both

  isPresent (word) {
    word = word.toLowerCase()
    let current = this.root
    for (let character of word) {
      if (current.children[character] === undefined) return false
      current = current.children[character]
    }
    return current.isEndOfWord
  }

  find (prefix) {
    prefix = prefix.toLowerCase()
    let current = this.root
    const words = []
    const prefixlength = prefix.length
    for (let character of prefix) {
      if (current.children[character] === undefined) return words
      current = current.children[character]
    }
    addWords(current, prefix, words, prefix)
    //TODO: make wordsadder as an external function.
    return words.sort()
  }
}

function addWords (node, string = '', words, prefix) {
  string += node.value
  if (node.isEndOfWord) {
    string = prefix.slice(0, prefix.length - 1) + string.slice(prefix.length)
    string = string[0].toUpperCase() + string.slice(1)
    words.push(string)
  }

  for (let key in node.children) {
    addWords(node.children[key], string, words, prefix)
  }
}

export default Trie
