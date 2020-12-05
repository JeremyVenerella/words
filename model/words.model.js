const mongoose = require('mongoose');

const wordsSchema = mongoose.Schema({
    word: {
        type: String,
    },
    definition: [String],
    type: {
        type: String,
    },
    example: {
        type: String,
    },
    phonetic: {
        type: String,
    },
});


wordsSchema.statics.findWord = async function(word){
    const _word = await Word.findOne({word});
    if(!_word)
        return;
    return _word;
};

const Word = mongoose.model('Word', wordsSchema);

module.exports = Word;