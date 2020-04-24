from django.contrib.auth import get_user_model
from django.db import models
from .constants import DESIGN_PAPER_CHOICES

# Create your models here.


class Invite(models.Model):
    title = models.CharField(max_length=50)
    desc = models.TextField(blank=True)
    design_paper = models.CharField(
        choices=DESIGN_PAPER_CHOICES, max_length=100, null=True
    )
    event_datetime = models.DateTimeField(null=True)
    address = models.TextField(blank=True)
    contact_phone_number = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        get_user_model(), null=True, on_delete=models.CASCADE
    )

