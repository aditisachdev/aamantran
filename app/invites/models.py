from django.contrib.auth import get_user_model
from django.db import models

# Create your models here.


class Invite(models.Model):
    title = models.CharField(max_length=50)
    desc = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    created_by = models.ForeignKey(
        get_user_model(), null=True, on_delete=models.CASCADE
    )

