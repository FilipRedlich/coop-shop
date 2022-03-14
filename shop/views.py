from django.http import HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.urls import reverse
from django.views import generic
from django.views.generic.base import TemplateView

from .models import Users,Basket,Categories,Products


class IndexView(generic.ListView):
    #model = Products
    template_name = 'shop/build/index.html'
    context_object_name = 'latest_question_list'
    def get_queryset(self):
        return Products.objects.order_by('name')

class CatView(TemplateView):
    template_name = 'shop/build/index.html'
    #context_object_name = 'cat_list'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['cats'] = Categories.objects.all()
        context['prods'] = Products.objects.all()
        return context
    
    #def get_queryset(self):
    #    return Categories.objects.order_by('name')

    '''
    context_object_name = 'latest_question_list'

    def get_queryset(self):
        """Return the last five published questions."""
        return Question.objects.order_by('-pub_date')[:5]
    '''

'''
class DetailView(generic.DetailView):
    model = Question
    template_name = 'shop/detail.html'


class ResultsView(generic.DetailView):
    model = Question
    template_name = 'shop/results.html'


def vote(request, question_id):
    question = get_object_or_404(Question, pk=question_id)
    try:
        selected_choice = question.choice_set.get(pk=request.POST['choice'])
    except (KeyError, Choice.DoesNotExist):
        # Redisplay the question voting form.
        return render(request, 'shop/detail.html', {
            'question': question,
            'error_message': "You didn't select a choice.",
        })
    else:
        selected_choice.votes += 1
        selected_choice.save()
        # Always return an HttpResponseRedirect after successfully dealing
        # with POST data. This prevents data from being posted twice if a
        # user hits the Back button.
        return HttpResponseRedirect(reverse('shop:results', args=(question.id,)))
'''