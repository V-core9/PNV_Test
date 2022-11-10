// Types and Interfaces

// Loading of things
import db from '../utils/db';


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
  createNewPage
};

module.exports = pagesService;
module.exports.default = pagesService;

export default pagesService;
