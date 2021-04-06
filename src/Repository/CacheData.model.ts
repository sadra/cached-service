import mongoose, { Document, Model, model, Schema } from 'mongoose';

/**
 * Interface to model the CacheData Schema for TypeScript.
 * @param key: string
 * @param data: object
 * @param ttl: number
 */
export interface ICacheData extends Document {
  key: string;
  data: object;
  ttl: number;
}

interface CacheDataAttrs {
  key: string;
  data: object;
  ttl: number;
}

interface CacheDataModel extends Model<ICacheData> {
  build(attrs: CacheDataAttrs): ICacheData;
}

const cacheDataSchema: Schema = new Schema({
  key: {
    type: String,
    required: true,
    unique: true,
  },
  data: {
    type: Object,
    required: true,
  },
  ttl: {
    type: Number,
    required: true,
    default: 60000,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

cacheDataSchema.statics.build = (attrs: CacheDataAttrs) => {
  return new CacheData(attrs);
};

const CacheData = mongoose.model<ICacheData, CacheDataModel>(
  'CacheData',
  cacheDataSchema,
);

export default CacheData;
