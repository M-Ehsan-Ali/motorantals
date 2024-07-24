import PersonType, { CreatePersonFields } from "../../types/PersonType";
import { Person } from "../../models";

const CreatePerson = {
  type: PersonType,
  args: CreatePersonFields,

  async resolve({ request, response }, fields) {
    if (request.user) {
      let where = { userId: request.user.id };

      const exists = await Person.findOne({
        where,
      });
      if (exists) {
        return null;
      }

      const newPerson = await Person.create({
        userId: request.user.id,
        share: 0,
        ...fields,
      });

      return newPerson;
    } else {
      return null;
    }
  },
};

export default CreatePerson;
