import { extendType, objectType } from 'nexus';

import { createSession, getToken } from '../../lib/opentokService';

// Profile Type
export const Session = objectType({
  name: 'Session',
  description: 'A Session',
  definition(t) {
    t.nonNull.id('id');
    t.nonNull.date('createdAt');
    t.nonNull.date('updatedAt');
    t.nonNull.string('sessionId');
    t.nonNull.string('description');

    t.string('apiKey', {
      description: 'The API key for Tokbox',
      resolve() {
        return process.env.OPENTOK_API_KEY;
      },
    });

    t.string('token', {
      description: 'The token for this session',
      resolve({ sessionId }) {
        return getToken(sessionId, 'moderator');
      },
    });
  },
});

export const SessionQueries = extendType({
  type: 'Query',
  definition: (t) => {
    t.list.field('sessions', {
      type: 'Session',
      description: 'Returns all sessions',
      resolve: async (_root, _args, ctx) => ctx.prisma.session.findMany(),
    });

    t.field('session', {
      type: 'Session',
      args: {
        id: 'ID',
      },
      description: 'Returns a session by id',
      resolve: async (_root, { id }, ctx) => ctx.prisma.session.findFirst({ where: { id } }),
    });
  },
});

export const SessionMutations = extendType({
  type: 'Mutation',
  definition: (t) => {
    t.field('createSession', {
      type: 'Session',
      args: { description: 'String' },
      resolve: async (_root, { description }, ctx) => {
        const otSession = await createSession();

        return ctx.prisma.session.create({
          data: {
            sessionId: otSession.sessionId,
            description: description,
          },
        });
      },
    });

    t.field('deleteSession', {
      type: 'Session',
      args: { id: 'ID' },
      resolve: async (_root, { id }, ctx) => {
        return ctx.prisma.session.delete({
          where: {
            id,
          },
        });
      },
    });
  },
});
