
const mongoose = require('../db'), Schema = mongoose.Schema

const CrawlerSchema = new Schema({
    currentPage: { type: Number, default: 1 },
    pageSize: { type: Number, default: 50 }
},{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})


module.exports = mongoose.model("Crawler", CrawlerSchema)
