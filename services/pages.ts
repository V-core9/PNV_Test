// Types and Interfaces

// Loading of things
import db from '../utils/db';




const listPages = (params: any = {}) => {

  return db.page.findMany({});
};

const findPageBySlug = (slug: string) => {
  return db.page.findUnique({
    where: {
      slug,
    },
  });
};

const createNewPage = async (page: any) => {
  const existingPage = await findPageBySlug(page.slug);
  if (existingPage === null) return db.page.create({ data: { ...page } });
  throw new Error(`Page Already Exists`);
}

const pagesService = {
  findPageBySlug,
  createNewPage,
  listPages,
};

module.exports = pagesService;
module.exports.default = pagesService;

export default pagesService;
