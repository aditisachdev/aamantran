from django.contrib import admin

# Register your models here.
from .models import Invite


class InviteAdmin(admin.ModelAdmin):
    pass


admin.site.register(Invite, InviteAdmin)
