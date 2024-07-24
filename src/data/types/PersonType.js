import {
  GraphQLObjectType as ObjectType,
  GraphQLID as ID,
  GraphQLString as StringType,
  GraphQLNonNull as NonNull,
  GraphQLInt,
} from "graphql";

export const CreatePersonFields = {
  name: { type: new NonNull(StringType) },
  email: { type: new NonNull(StringType) },
  phone: { type: new NonNull(StringType) },
  address: { type: new NonNull(StringType) },
  // line: { type: StringType },
  companyId: { type: new NonNull(GraphQLInt) },
};

const PersonType = new ObjectType({
  name: "Person",
  fields: {
    id: { type: new NonNull(GraphQLInt) },
    share: { type: new NonNull(GraphQLInt) },
    ...CreatePersonFields,
  },
});

export default PersonType;
