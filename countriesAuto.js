import { readFileSync } from 'fs'
import { start } from 'repl'
import Trie from './trieForAuto.js'

//TODO: imports to top external
const trie = new Trie()

const JSONdata = readFileSync('./countrylist.json', 'utf-8')
let parsedData = JSON.parse(JSONdata)
parsedData.forEach(value => {
  value = value.toLowerCase()
  trie.insert(value)
})

function myEval (cmd, context, filename, callback) {
  callback(null, trie.find(cmd.trim()))
}
start({ prompt: '> ', eval: myEval })
