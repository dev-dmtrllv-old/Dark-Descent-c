using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace DarkDescent
{
	public class Bat : MonoBehaviour
	{
		[SerializeField] float notifyRadius = 2f;
		[SerializeField] float awakeRadius = 2f;
		[SerializeField] LayerMask playerLayer;

		private Animator anim;

		void Start()
		{
			anim = GetComponent<Animator>();
		}

		void Update()
		{
			anim.SetBool("noticed", !!Physics2D.OverlapCircle(transform.position, notifyRadius, playerLayer));
			anim.SetBool("awake", !!Physics2D.OverlapCircle(transform.position, awakeRadius, playerLayer));
		}
	}
}
