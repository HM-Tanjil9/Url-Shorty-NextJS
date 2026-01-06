import connectDB from "@/config/db";
import Url, { IUrl } from "@/models/Url";

export default class UrlRepository {
    private urlModel;
    constructor() {
        connectDB();
        this.urlModel = Url;
    }
    async getUrlById(id: string) {
        return await this.urlModel.findById(id).lean();
    }
    async getUrlByShortUrl(shortUrl: string): Promise<IUrl | null> {
        return await this.urlModel.findOne({ shortUrl }).lean();
    }
    async getUrlByOriginalUrl(originalUrl: string): Promise<IUrl | null> {
        return await this.urlModel.findOne({ originalUrl }).lean();
    }
    async getAllUrls() : Promise<IUrl[] | null> {
        return await this.urlModel.find().lean();
    }
    async deleteUrl(id: string): Promise<IUrl | null> {
        return await this.urlModel.findByIdAndDelete(id).lean();
    }
    async createUrl(originalUrl: string, shortUrl: string): Promise<IUrl> {
        const newUrl = new this.urlModel({ originalUrl, shortUrl });
        return await newUrl.save();
    }
    async updateUrl(id: string, updatedFields: Partial<IUrl>): Promise<IUrl | null> {
        return await this.urlModel.findByIdAndUpdate(id, updatedFields, { new: true }).lean();
    }
}