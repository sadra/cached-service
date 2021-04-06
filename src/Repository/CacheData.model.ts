import mongoose, { Document, Model, model, Schema } from 'mongoose';

/**
 * Interface to model the CacheData Schema for TypeScript.
 * @param key: string
 * @param data: object
 */
export interface ICacheData extends Document {
  key: string;
  data: object;
}

interface CacheDataAttrs {
  key: string;
  data: object;
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
  date: {
    type: Date,
    default: Date.now,
    index: { expires: '1m' },
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
