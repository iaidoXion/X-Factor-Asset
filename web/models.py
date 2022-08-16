from django.contrib.auth.models import User
from django.db import models

class MenuSetting(models.Model):
    menuId = models.CharField(max_length=50)
    menuName = models.CharField(max_length=200)
    menuUrl = models.CharField(max_length=200)
    menuImg = models.CharField(max_length=200)
    menuUse = models.CharField(max_length=10)
    menuNote = models.TextField()
    menuCreateDate = models.DateTimeField()


class Question(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_question')
    subject = models.CharField(max_length=200)
    content = models.TextField()
    create_date = models.DateTimeField()
    modify_date = models.DateTimeField(null=True, blank=True)
    voter = models.ManyToManyField(User, related_name='voter_question')

    def __str__(self):
        return self.subject


class Answer(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name='author_answer')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    content = models.TextField()
    create_date = models.DateTimeField()
    modify_date = models.DateTimeField(null=True, blank=True)
    voter = models.ManyToManyField(User, related_name='voter_answer')

