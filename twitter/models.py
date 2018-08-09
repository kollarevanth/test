from django.db import models
from django.contrib.auth.models import User
# Create your models here.
class Following(models.Model):
    following_id=models.IntegerField()
    user=models.ForeignKey(User,on_delete=models.CASCADE)

class Posts(models.Model):
    likes=models.IntegerField()
    name = models.CharField(max_length=100)
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    post=models.FileField(upload_to='./test/staticfiles/bundles/images/%m/%d')


class Profilepics(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    name=models.CharField(max_length=100)
    pic=models.FileField(upload_to='./test/staticfiles/bundles/images/%m/%d')


class Comments(models.Model):
    comment=models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    post=models.ForeignKey(Posts,on_delete=models.CASCADE)

class Replys(models.Model):
    reply=models.CharField(max_length=100)
    name = models.CharField(max_length=100)
    comment=models.ForeignKey(Comments,on_delete=models.CASCADE)
