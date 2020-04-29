import graphene
from graphene_django import DjangoObjectType

from .models import Invite
from .constants import DESIGN_PAPER_CHOICES


class InviteType(DjangoObjectType):
    class Meta:
        model = Invite
        convert_choices_to_enum = False


class Query(graphene.ObjectType):
    invite = graphene.Field(InviteType, id=graphene.Int(required=True))
    invites = graphene.List(InviteType)
    designs = graphene.List(graphene.String)

    def resolve_invite(self, info, id):
        return Invite.objects.get(pk=id)

    def resolve_invites(self, info):
        return Invite.objects.all()

    def resolve_designs(self, info):
        return [design[1] for design in DESIGN_PAPER_CHOICES]


class CreateInvite(graphene.Mutation):
    invite = graphene.Field(InviteType)

    class Arguments:
        title = graphene.String(required=True)
        address = graphene.String(required=False)
        contact_phone_number = graphene.String(required=False)
        title = graphene.String(required=False)
        desc = graphene.String(required=False)
        design_paper = graphene.String(required=False)
        event_datetime = graphene.DateTime(required=False)

    def mutate(
        self,
        info,
        title,
        address="",
        contact_phone_number="",
        desc="",
        design_paper="baby_feet",
        event_datetime=None,
    ):
        user = info.context.user
        if user.is_anonymous:
            raise Exception("Sorry, you need to be logged in to create an invite")

        invite = Invite(
            title=title,
            address=address,
            contact_phone_number=contact_phone_number,
            desc=desc,
            design_paper=design_paper,
            event_datetime=event_datetime,
            created_by=user,
        )
        invite.save()
        return CreateInvite(invite=invite)


class UpdateInvite(graphene.Mutation):
    invite = graphene.Field(InviteType)

    class Arguments:
        invite_id = graphene.Int(required=True)
        address = graphene.String(required=False)
        contact_phone_number = graphene.String(required=False)
        title = graphene.String(required=False)
        desc = graphene.String(required=False)
        design_paper = graphene.String(required=False)
        event_datetime = graphene.DateTime(required=False)

    def mutate(
        self,
        info,
        invite_id,
        address=None,
        contact_phone_number=None,
        desc=None,
        design_paper=None,
        event_datetime=None,
        title=None,
    ):
        user = info.context.user
        invite = Invite.objects.get(pk=invite_id)
        if invite.created_by != user:
            raise Exception("Only the owner of this invite can edit it. ")

        if address:
            invite.address = address

        if contact_phone_number:
            invite.contact_phone_number = contact_phone_number

        if desc:
            invite.desc = desc

        if design_paper:
            invite.design_paper = design_paper

        if event_datetime:
            invite.event_datetime = event_datetime

        if title:
            invite.title = title

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

