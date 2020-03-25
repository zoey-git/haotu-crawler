
const mongoose = require('../db'), Schema = mongoose.Schema

const PhotoSchema = new Schema({
    privacy: { type: Boolean, default: false }, // 是否是自己可见
    user_id: { type: Schema.Types.ObjectId }, // 上传的用户
    image_url: { type: String, required: true }, // 图片地址
    detail_url: { type: String, required: true }, // 详情展示图片
    mini_url: { type: String, required: true }, // 瀑布流展示图片
    width: { type: Number, required: true }, // 图片地址
    height: { type: Number, required: true }, // 图片地址
    image_format: { type: String, required: true }, // 图片格式
    description: { type: String }, // 图片描述
    category: { type: String }, // 图片分类
    comments_count: { type: Number, required: true }, // 评论数量
    votes_count: { type: Number, required: true }, // 喜欢数量
    background_color: { type: String, required: true }, // 图片背景颜色
},{
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
})


module.exports = mongoose.model("Photo", PhotoSchema)
