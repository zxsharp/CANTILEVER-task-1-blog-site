
import mongoose from 'mongoose';

const bookmarkSchema = new mongoose.Schema({
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
}, { timestamps: true });

export const Bookmark = mongoose.model('Bookmark', bookmarkSchema);
