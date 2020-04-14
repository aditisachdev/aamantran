import graphene
from graphene_django import DjangoObjectType

from .models import Invite


class InviteType(DjangoObjectType):
    class Meta:
        model = Invite


class Query(graphene.ObjectType):
    invites = graphene.List(InviteType)

    def resolve_invites(self, info):
        return Invite.objects.all()


class CreateInvite(graphene.Mutation):
    invite = graphene.Field(InviteType)

    class Arguments:
        title = graphene.String(required=True)
        desc = graphene.String()

    def mutate(self, info, title, desc):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Sorry, you need to be logged in to create an invite")

        invite = Invite(title=title, desc=desc, created_by=user)
        invite.save()
        return CreateInvite(invite=invite)


class UpdateInvite(graphene.Mutation):
    invite = graphene.Field(InviteType)

    class Arguments:
        invite_id = graphene.Int(required=True)
        title = graphene.String(required=False)
        desc = graphene.String(required=False)

    def mutate(self, info, invite_id, title=None, desc=None):
        user = info.context.user
        invite = Invite.objects.get(pk=invite_id)
        if invite.created_by != user:
            raise Exception("Only the owner of this invite can edit it. ")

        if title:
            invite.title = title

        if desc:
            invite.desc = desc
        invite.save()
        return UpdateInvite(invite=invite)


class DeleteInvite(graphene.Mutation):
    invite_id = graphene.Int()

    class Arguments:
        invite_id = graphene.Int(required=True)

    def mutate(self, info, invite_id):
        user = info.context.user
        invite = Invite.objects.get(pk=invite_id)
        if invite.created_by is not None and invite.created_by != user:
            raise Exception("Only the owner of this invite can delete it. ")

        invite.delete()
        return DeleteInvite(invite_id=invite_id)


class Mutation(graphene.ObjectType):
    create_invite = CreateInvite.Field()
    update_invite = UpdateInvite.Field()
    delete_invite = DeleteInvite.Field()

